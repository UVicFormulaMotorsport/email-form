


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
            //no autofocus
            console.log("no autofocus support")
        }
        if(!supports.required){
            //no required
            console.log("no required support")
        }
        if(!supports.placeholder){
            //no placeholder
            console.log("no placeholder support")
        }

    
        //create send object for detecting button press, the button will change to ...Sending regardless of if it actually is or not.
        var send = document.getElementById("register-submit");
        if(send){
            send.onclick = function () {
                this.innerHTML = '...Sending';
            }
        }

    })();