window.onload = function () {
var canvas = new fabric.Canvas('canvas');
function handleDragStart(e) {
[].forEach.call(images, function (img) {
img.classList.remove('img_dragging');
});
this.classList.add('img_dragging');
}
function handleDragOver(e) {
if (e.preventDefault) {
e.preventDefault();
}
e.dataTransfer.dropEffect = 'copy';
return false;
}
function handleDragEnter(e) {
this.classList.add('over');
}
function handleDragLeave(e) {
this.classList.remove('over');
}
function handleDrop(e) {
if (e.stopPropagation) {
e.stopPropagation(); // stops the browser from redirecting.
}
var img = document.querySelector('#images img.img_dragging');
var newImage = new fabric.Image(img, {
width: img.width,
height: img.height,
// Set the center of the new object based on the event coordinates relative
// to the canvas container.
left: e.layerX,
top: e.layerY
});
newImage.hasBorders = false;
canvas.add(newImage);
return false;
}
function handleDragEnd(e) {
// this/e.target is the source node.
[].forEach.call(images, function (img) {
img.classList.remove('img_dragging');
});
}
function addText(e)
{
var textToAdd = document.getElementById("text").value;
var text = new fabric.Text(textToAdd, { left: 10, top: 10 });
canvas.add(text);
}
function addFilter(e)
{
var chkArray = [];
$(".chk:checked").each(function() {
chkArray.push($(this).val());
});
var obj = canvas.getActiveObject();
for (var i=0;i<chkArray.length ;i++)
{
var fillter = chkArray[i];
var filter;
if(fillter=="Sepia")
filter = new fabric.Image.filters.Sepia();
obj.filters.push(filter);
obj.applyFilters(canvas.renderAll.bind(canvas));
}
}
if (Modernizr.draganddrop) {
var images = document.querySelectorAll('#images img');
[].forEach.call(images, function (img) {
img.addEventListener('dragstart', handleDragStart, false);
img.addEventListener('dragend', handleDragEnd, false);
});
var canvasContainer = document.getElementById("canvas-container");
canvasContainer.addEventListener('dragenter', handleDragEnter, false);
canvasContainer.addEventListener('dragover', handleDragOver, false);
canvasContainer.addEventListener('dragleave', handleDragLeave, false);
canvasContainer.addEventListener('drop', handleDrop, false);
var textButton = document.getElementById("textButton");
textButton.addEventListener("click",addText,false);
var filterButton = document.getElementById("applyFilter");
filterButton.addEventListener("click",addFilter,false);
} else {
alert("This browser doesn't support the HTML5 Drag and Drop API.");
}
}