const VCode = {
    chars: "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Vlen: 4,

    createVCode(len) {
        let vcode = "";

        for (let i = 1; i <= len; i++) {
            vcode += this.chars[Math.fround(Math.random() * this.chars.length)];
        }
        return vcode;
    },

    showVCode() {
        document.querySelector("vcodeImg").innerHTML = this.createVCode(this.Vlen);
    }
};//VCode

const Verifying = {

    showError(input, message) {
        const formGroup = input.parentElement;

        formGroup.classList.remove("success");
        formGroup.classList.add("error");

        formGroup.querySelector('tips').innerText = message;
    }
}