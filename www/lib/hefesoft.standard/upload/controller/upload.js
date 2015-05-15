angular.module('starter')
.controller('uploadCtrl', ['$scope', 'uploadService', function ($scope, uploadService) {
	 
        
        $scope.fileUploadProgress = "0.00 %";
        var urlUploadFiles = "http://hefesoft.blob.core.windows.net/files/files?sv=2014-02-14&sr=c&sig=RqRcu1vwp56UdXTdRpZfEEWzv7rYrDT87B5iZafAOS4%3D&st=2015-05-15T05%3A00%3A00Z&se=2030-12-02T05%3A00%3A00Z&sp=rwl";
        
         
        $(document).ready(function () {
            $scope.mostrarCargar = false;
            //$("#file").bind('change', handleFileSelect);

            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Great success! All the File APIs are supported.
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
        });
         
        //Read the file and find out how many blocks we would need to split it.
        $scope.handleFileSelect = function(e) {
            $scope.fileUploadProgress = "0.00 %";           
            maxBlockSize = 256 * 1024;
            currentFilePointer = 0;
            totalBytesRemaining = 0;
            //var files = e.target.files;

            selectedFile = e[0];
            $scope.mostrarCargar = true;
            
            $scope.fileName = selectedFile.name;
            $scope.fileSize = selectedFile.size;
            $scope.fileType = selectedFile.type;           
            
            var fileSize = selectedFile.size;
            if (fileSize < maxBlockSize) {
                maxBlockSize = fileSize;
                console.log("max block size = " + maxBlockSize);
            }
            totalBytesRemaining = fileSize;
            if (fileSize % maxBlockSize == 0) {
                numberOfBlocks = fileSize / maxBlockSize;
            } else {
                numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
            }
            console.log("total blocks = " + numberOfBlocks);
            var baseUrl = urlUploadFiles;
            var indexOfQueryStart = baseUrl.indexOf("?");
            submitUri = baseUrl.substring(0, indexOfQueryStart) + '/' + selectedFile.name + baseUrl.substring(indexOfQueryStart);
            console.log(submitUri);
        }
 
        
 
     $scope.uploadFileInBlocks = function() {
            
        }
         
        
        

        inicializar();  
	
}])