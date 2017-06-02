var CorrectAngleImg = React.createClass({
	getInitialState: function() {
    	return {
    		style: {
    			background: dataURL
    		},
    		dataURL: ""
    	}
  	},
	render:function(){
		var img = this.props.img;
		this.state.dataURL = getCorrectImgURL(file);
		this.state.style.width = this.props.width;
		this.state.style.height = this.props.height;
		return <div className="resultChild" style={this.state.style}></div>
	}
})


function getFormatImgURL(file, callback){
	EXIF.getData(file, function() {
	  var orientation = EXIF.getTag(this,"Orientation");
	  var can = document.createElement("canvas");
	  var ctx = can.getContext('2d');
	  var thisImage = new Image;
	  thisImage.onload = function() {
	    can.width  = thisImage.width;
	    can.height = thisImage.height;
	    ctx.save();
	    var width  = can.width;  var styleWidth  = can.style.width;
	    var height = can.height; var styleHeight = can.style.height;
	    if (orientation) {
	      if (orientation > 4) {
	        can.width  = height; can.style.width  = styleHeight;
	        can.height = width;  can.style.height = styleWidth;
	      }
	      switch (orientation) {
		      case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
		      case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
		      case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
		      case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
		      case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
		      case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
		      case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
	      }
	    }
	    ctx.drawImage(thisImage,0,0);
	    ctx.restore();
	    return can.toDataURL();
	    // if (callback) {
	    // 	callback(can.toDataURL())
	    // }
	    // at this point you can save the image away to your back-end using 'dataURL'
	  }
	  thisImage.src = URL.createObjectURL(file);
	});
}
