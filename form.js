const getValidForm = () => {
    const aRequiredFields = document.getElementsByClassName("required");
    const aInvalidFields = Array.from(aRequiredFields).filter(($input) => {
        const $errorMessage = $input.parentElement.getElementsByClassName("errorMessage")[0];

        if ($input.value === "") {            
            $errorMessage.classList.remove("hidden");
            $input.classList.add("error");
            return $input;
        } else {
            if ($input.type === "email" && !isValidEmail($input.value)) {
                $input.classList.add("error");
                return $input;
            } else {
                $errorMessage.classList.add("hidden");
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
    
    const $checkboxWrapper = document.getElementsByClassName("checkboxWrapper")[0];
    const $checkboxError = $checkboxWrapper.getElementsByClassName("errorMessage")[0];
    if (aCheckedCheckboxes.length === 0) {        
        $checkboxError.classList.remove("hidden");
    } else {
        $checkboxError.classList.add("hidden");
    }
    
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

        let aFormBody = [];
        for (const oProperty in oData) {
            const sEncodedKey = encodeURIComponent(oProperty);
            const sEncodedValue = encodeURIComponent(oData[oProperty]);
            aFormBody.push(sEncodedKey + "=" + sEncodedValue);
        }
        aFormBody = aFormBody.join("&");
        
        try {
            const oResponse = await fetch(sUrl, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: aFormBody
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

const resetForm = () => {
    const $inputWrappers = document.getElementsByClassName("inputWrapper");
    Array.from($inputWrappers).forEach($inputWrapper => {
        const $input = $inputWrapper.getElementsByTagName("input")[0] || $inputWrapper.getElementsByTagName("select")[0];
        const $errorMessage = $inputWrapper.getElementsByClassName("errorMessage")[0];
        $input.classList.remove("error");
        
        if ($errorMessage) {
            $errorMessage.classList.add("hidden");
        }
    })
    const $checkboxWrapper = document.getElementsByClassName("checkboxWrapper")[0];
    const $checkboxError = $checkboxWrapper.getElementsByClassName("errorMessage")[0];
    $checkboxError.classList.add("hidden");
    
    $form.reset();
};

const $form = document.querySelector('form');
$form.addEventListener('submit', submitForm);
$form.addEventListener('reset', resetForm);