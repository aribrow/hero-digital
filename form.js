const validateForm = () => {
    const aRequiredFields = document.getElementsByClassName("required");
    const sEmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const aInvalidFields = Array.from(aRequiredFields).filter(($input) => {
        if ($input.value === "") {
            //invalid
            return $input;
        } else {
            if ($input.type === "email" && !$input.value.match(sEmailRegEx)) {
                //invalid
                return $input;
            }
        }
    });
    const aCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const aUncheckedCheckboxes = Array.from(aCheckboxes).filter(($checkbox) => {
        if (!$checkbox.checked) {
            return $checkbox;
        }
    });
    console.log(aUncheckedCheckboxes);
}

const resetForm = () => {

};