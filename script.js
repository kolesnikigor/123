"use strict";

let $searchForm = $('#search-form');
let $carouselInner = $('.carousel-inner');
let $left = $(".carousel-control-prev");
let $right = $(".carousel-control-next");
let videos = [];

$searchForm.on("submit", function (event) {
  event.preventDefault();
  let query = $(this).find('[name="srch-term"]').val().replace(/\s/g, "+");

  console.log("query", query);
  getVideos(query);
});

function getVideos(query) {
  let url = `https://itunes.apple.com/search?limit=10&entity=musicVideo&`;

  $.ajax({
      url,
      method: "GET",
      data: `term=${query}`,
      dataType: "json"
  }).done((response) => {
      console.log(response);
      videos = response.results;
      addVideos(videos);
  }).fail((error) => {
      console.log(error);
  })
}

function addVideos(data) {
  data.forEach(() => {
      $("<div>").addClass("carousel-item")
          .appendTo($carouselInner);
  });
  let $carouselItem = $(".carousel-item");
  $(".carousel-item:first-child").addClass("active");
  data.forEach((_item, index) => {
      $("<video>")
          .attr("src", data[index].previewUrl)
          .attr("controls", true)
          .width("100%")
          .height("450px")
          .appendTo($carouselItem[index]);
  });
}

$left.on("click", function (){
    $('video').trigger('pause');
});

$right.on("click", function (){
    $('video').trigger('pause');
});

