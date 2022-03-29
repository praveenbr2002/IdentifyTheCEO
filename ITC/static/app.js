Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        var url = "http://127.0.0.1:8000/classify/";
        $.post(url, 
            {image_data: file.dataURL},
            function (data){
                if (data['bool'] == 0){
                    $("#error").show();
                    $("#resultHolder").hide();
                    $("#divClassTable").hide();
                }
                else if (data['bool'] == 1){
                    $("#error").hide();
                    $("#resultHolder").show();
                    $("#divClassTable").show();
                    $("#resultHolder").html($(`[data-player="${data['class']}"`).html());
                    for (let x in data['class_dictionary']){
                        $("#score_"+String(data['class_dictionary'][x])).html(data['class_probability'][data['class_dictionary'][x]]);
                        //console.log("score_"+String(data['class_dictionary'][x]));
                    }

                }
            }
            );
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );   
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    init();
});

