// photo upload
// http://stackoverflow.com/questions/23402187/multiple-files-upload-and-using-file-reader-to-preview
function readImage(event) {
/*
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
			$scope.input.photo = e.target.result;
			$scope.$apply();
        };
        FR.readAsDataURL( this.files[0] );
    }
    */
    if (window.File && window.FileList && window.FileReader) {
        event = event || window.event;
        var files = event.target.files; //FileList object

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) continue;

            var picReader = new FileReader();
            picReader.onload = function(e) {
                $scope.input.photos.push(e.target.result);
                $scope.$apply();
            };

            //Read the image
            picReader.readAsDataURL(file);
        }
    } else {
        console.log("Your browser does not support File API");
    }
}
// Mute this statement when running testing
document.getElementById("photoUploader").addEventListener("change", readImage, false);
//////////////
