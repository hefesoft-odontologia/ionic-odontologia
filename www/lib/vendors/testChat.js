var ChatHubWrapper = function () {
            var self = this;
            var chat = null;            
            var onMessageCallback = function () { };

            self.useBearerToken = function (token) {
                setTokenCookie(token);
            };

            function setTokenCookie(token) {
                if (token)
                    document.cookie = "BearerToken=" + token + "; path=/";
            }

            self.clearAuthentication = function () {
                document.cookie = "BearerToken=; path=/; expires=" + new Date(0).toUTCString();
            }

            
        };

        var chatHub = new ChatHubWrapper();
        // clear token cookie when page reloads
        chatHub.clearAuthentication();

        // example of WebAPI call using bearer token
        var bearerToken = null;
        var proxy;
        