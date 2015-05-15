angular.module('starter')
.service('uploadService', [function () {

	var dataService = {}; 
	var selectedFile;

	var maxBlockSize = 256 * 1024;//Each file will be split in 256 KB.
    var numberOfBlocks = 1;
    var selectedFile = null;
    var currentFilePointer = 0;
    var totalBytesRemaining = 0;
    var blockIds = new Array();
    var blockIdPrefix = "block-";
    var submitUri = null;
    var bytesUploaded = 0;


	var reader = new FileReader();
 
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                var uri = submitUri + '&comp=block&blockid=' + blockIds[blockIds.length - 1];
                var requestData = new Uint8Array(evt.target.result);
                $.ajax({
                    url: uri,
                    type: "PUT",
                    data: requestData,
                    processData: false,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                        xhr.setRequestHeader('Content-Length', requestData.length);
                    },
                    success: function (data, status) {
                        console.log(data);
                        console.log(status);
                        bytesUploaded += requestData.length;
                        var percentComplete = ((parseFloat(bytesUploaded) / parseFloat(selectedFile.size)) * 100).toFixed(2);

                        $scope.$apply(function(){
                            $scope.fileUploadProgress = percentComplete + " %";
                        });

                        $scope.uploadFileInBlocks();
                    },
                    error: function(xhr, desc, err) {
                        console.log(desc);
                        console.log(err);
                    }
                });
            }
        };

        function commitBlockList() {
            var uri = submitUri + '&comp=blocklist';
            console.log(uri);
            var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
            for (var i = 0; i < blockIds.length; i++) {
                requestBody += '<Latest>' + blockIds[i] + '</Latest>';
            }
            requestBody += '</BlockList>';
            console.log(requestBody);
            $.ajax({
                url: uri,
                type: "PUT",
                data: requestBody,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-ms-blob-content-type', selectedFile.type);
                    xhr.setRequestHeader('Content-Length', requestBody.length);
                },
                success: function (data, status) {
                    console.log(data);
                    console.log(status);
                },
                error: function (xhr, desc, err) {
                    console.log(desc);
                    console.log(err);
                }
            });
 
        }


        function pad(number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        }

        function inicializar(){
            maxBlockSize = 256 * 1024;//Each file will be split in 256 KB.
            numberOfBlocks = 1;
            selectedFile = null;
            currentFilePointer = 0;
            totalBytesRemaining = 0;
            blockIds = new Array();
            blockIdPrefix = "block-";
            submitUri = null;
            bytesUploaded = 0;            
        }

        dataService.upload = function(File, baseUrl){
        	inicializar();
        	submitUri = baseUrl;
        	selectedFile = File;
        	if (totalBytesRemaining > 0) {
                console.log("current file pointer = " + currentFilePointer + " bytes read = " + maxBlockSize);
                var fileContent = selectedFile.slice(currentFilePointer, currentFilePointer + maxBlockSize);
                var blockId = blockIdPrefix + pad(blockIds.length, 6);
                console.log("block id = " + blockId);
                blockIds.push(btoa(blockId));
                reader.readAsArrayBuffer(fileContent);
                currentFilePointer += maxBlockSize;
                totalBytesRemaining -= maxBlockSize;
                if (totalBytesRemaining < maxBlockSize) {
                    maxBlockSize = totalBytesRemaining;
                }
            } else {
                commitBlockList();
            }
        }


        return dataService;
	
}])