


(function() {
        // Check if browser supports some of the features used in the register-form
        //create input element for testing
        var input = document.createElement('input');

        //create the supports object
        var supports = {};

        supports.autofocus = 'autofocus' in input;
        supports.required    = 'required' in input;
        supports.placeholder = 'placeholder' in input;

        if(!supports.autofocus){
            console.log("no autofocus support")
        }
        if(!supports.required){
            console.log("no required support")
        }
        if(!supports.placeholder){
            console.log("no placeholder support")
        }

    
        //create send object for detecting button press, *** This doesn't work right now   ***
        var send = document.getElementById("register-submit");
        if(send){
            send.onclick = function () {
                this.innerHTML = '...Sending';
            }
        }

    })();