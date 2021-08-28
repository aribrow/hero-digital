const getValidForm = () => {
    const aRequiredFields = document.getElementsByClassName("required");
    const aInvalidFields = Array.from(aRequiredFields).filter(($input) => {
        if ($input.value === "") {
            $input.classList.add("error");
            return $input;
        } else {
            if ($input.type === "email" && !isValidEmail($input.value)) {
                $input.classList.add("error");
                return $input;
            } else {
                $input.classList.remove("error");
            }
        }
    });
    const aCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const aCheckedCheckboxes = Array.from(aCheckboxes).filter(($checkbox) => {
        if ($checkbox.checked) {
            return $checkbox;
        }
    });
    
    const bValid = aInvalidFields.length === 0 && aCheckedCheckboxes.length >= 1;
    return bValid;
}

const isValidEmail = sEmail => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(sEmail).toLowerCase());
}

const submitForm = async (oEvent) => {
    oEvent.preventDefault();
    const bValidForm = getValidForm();
    
    if (bValidForm) {
        const oFormFields = new FormData(oEvent.target);
        const oData = Object.fromEntries(oFormFields.entries());
        const sUrl = "http://localhost:5000/api/submit";
        
        try {
            const oResponse = await fetch(sUrl, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(oData)
            });

            const oResponseBody = await oResponse.json();
            if (oResponse.status >= 400) {
                throw new Error(oResponseBody.message);
            }
            
            const $message = document.getElementById("message");
            const $mainContainer = document.getElementById("main");
            $mainContainer.classList.add("hidden");
            $message.innerText = oResponseBody.message;
        } catch (e) {
            console.error(e);
        }
    }
}

const resetForm = (oEvent) => {
    $form.reset();
};

const $form = document.querySelector('form');
$form.addEventListener('submit', submitForm);
$form.addEventListener('reset', resetForm);