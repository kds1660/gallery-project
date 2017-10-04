function inputActions() {
    setTimeout(function () {
        $(".elmName").focus();
        $(".elmName").keyup(function (event) {
            if (event.keyCode === 13) {
                $('.btn-ok').trigger('click');
            }
        })
    },0)

}
