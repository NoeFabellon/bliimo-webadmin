// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery
//= require process.js
//= require uikit
//= require uikit/uikit.js
//= require uikit/uikit-icons.js
//= require_tree .

$(document).on("turbolinks:load", function () {
  // Show and hide alert on login
  if ($(".alert").html() == "") {
    $(".uk-alert-danger").hide();
  } else {
    $(".uk-alert-danger").show();
  }
  // Show modal on add listing
  $("#js-modal-prompt").click(function () {
    $(".uk-modal").show();
    details();
  });
  // Hide modal
  $(".uk-modal-close-default").click(function () {
    $(".uk-modal").hide();
  });

  if ($("div.edit-form").html != "") {
    details();
  }
  // Details tab
  function details() {
    $(".uk-switcher li").hide();
    $("li#details").show();
    $(".uk-tab li").removeClass("uk-active");
    $(".uk-tab li:nth-child(1)").addClass("uk-active");
  }

  $("a#tab-details").click(function () {
    details();
  });

  // Location tab
  function location() {
    $(".uk-switcher li").hide();
    $("li#location").show();
    $(".uk-tab li").removeClass("uk-active");
    $(".uk-tab li:nth-child(2)").addClass("uk-active");
  }

  $("a#tab-location").click(function () {
    location();
  });

  // Features tab
  function features() {
    $(".uk-switcher li").hide();
    $("li#features").show();
    $(".uk-tab li").removeClass("uk-active");
    $(".uk-tab li:nth-child(3)").addClass("uk-active");
  }

  $("a#tab-features").click(function () {
    features();
  });

  // Capitalize words
  function keyUp(e) {
    $(e).keyup(function () {
      var str = $(e).val();
      var spart = str.split(" ");
      for (var i = 0; i < spart.length; i++) {
        var j = spart[i].charAt(0).toUpperCase();
        spart[i] = j + spart[i].substr(1);
      }
      $(e).val(spart.join(" "));
    });
  }

  // add feature
  keyUp("#listing_temp");
  let tagsCount = 0;
  function addTag(tag) {
    tagsCount += 1;
    let span_count = $("span.uk-badge").size();
    let uniqueTag = 0;
    if (span_count < 5) {
      if (span_count == 0) {
        $("#tags-overflow").append(`<span class="uk-badge" id="${tagsCount}">${tag}<a id="${tagsCount}"> x</a></span>`);
        $("#listing_temp").val("");
      } else {
        for (x = 1; x <= span_count; x++) {
          let spanTag = $(`div span.uk-badge:nth-child(${x})`)
            .text()
            .replace(" x", "");
          if (tag == spanTag) {
            uniqueTag += 1;
          }
        }
        if (uniqueTag == 0) {
          $("#tags-overflow").append(`<span class="uk-badge" id="${tagsCount}">${tag}<a id="${tagsCount}"> x</a></span>`);
          $("#listing_temp").val("");
        }
      }
    }
    $("span.uk-badge a").click(function () {
      let a_id = $(this).attr("id");
      $(`span#${a_id}`).remove();
    });
  }

  // Feature button
  $("div.feature-dropdown").hide();
  $("#listing_temp").click(function () {
    $("div#feature-dropdown-one").toggle();
  });

  $("#listing_temp").keypress(function () {
    $("div#feature-dropdown-one").hide();
  });

  // add tag by select
  $("a.dropdown-tags").click(function () {
    $("#listing_temp").val("");
    let span_count = $("span.uk-badge").size();
    if (span_count < 5) {
      $(this).attr("background", "#a3c117");
    }
    addTag($(this).text());
  });

  // add tag by text
  $("#add-feature-tag").click(function () {
    let tag = $("#listing_temp").val();
    if (tag != "") {
      addTag(tag);
    }
  });

  // disable/enable edit
  if ($("select.status-select").val() == "inactive") {
    $("div.uk-modal-header").addClass("disabledbutton");
    $("div.uk-modal-body").addClass("disabledbutton");
  }

  $("select.status-select").change(function () {
    if ($(this).val() == "inactive") {
      $("div.uk-modal-header").addClass("disabledbutton");
      $("div.uk-modal-body").addClass("disabledbutton");
    }
    if ($(this).val() == "active") {
      $("div.uk-modal-header").removeClass("disabledbutton");
      $("div.uk-modal-body").removeClass("disabledbutton");
    }
  });

  $("#listing_property_type option:nth-child(1)").attr({ disabled: true });
  $("#listing_contract_type option:nth-child(1)").attr({ disabled: true });
  $("#listing_bedroom_type option:nth-child(1)").attr({ disabled: true });

  $(".side-nav").on("click", function (e) {
    if ($(this).attr("id") === "experiences-link") {
      if ($("#toggle-animation").hasClass("uk-hidden")) {
        $("#toggle-animation").removeClass("uk-hidden");
      } else {
        $("#toggle-animation").addClass("uk-hidden");
      }
    }
  });
  $("#experiences-link2").on("click", function (e) {
    if ($(this).attr("id") === "experiences-link2") {
      if ($("#toggle-animation2").hasClass("uk-hidden")) {
        $("#toggle-animation2").removeClass("uk-hidden");
      } else {
        $("#toggle-animation2").addClass("uk-hidden");
      }
    }
  });

  if (window.location.pathname.includes("travels")) {
    $("#toggle-animation").removeClass("uk-hidden");
    $(".experience-main").addClass("active-page");
    $("#travel-nav-all").addClass("travel-active-link");
  }
  if (window.location.pathname.includes("foods")) {
    $("#toggle-animation").removeClass("uk-hidden");
    $(".experience-main").addClass("active-page");
    $("#food-nav-all").addClass("travel-active-link");
  }
  if (window.location.pathname.includes("lodgings")) {
    $("#toggle-animation").removeClass("uk-hidden");
    $(".experience-main").addClass("active-page");
    $("#lodging-nav-all").addClass("travel-active-link");
  }
  if (window.location.pathname.includes("wellness")) {
    $("#toggle-animation").removeClass("uk-hidden");
    $(".experience-main").addClass("active-page");
    $("#wellness-nav-all").addClass("travel-active-link");
  }
  if (window.location.pathname.includes("events")) {
    $("#toggle-animation").removeClass("uk-hidden");
    $(".experience-main").addClass("active-page");
    $("#event-nav-all").addClass("travel-active-link");
  }

  $(".travel-nav-link").click(function (e) {
    // //remove all navlink color
    $(".travel-nav-link").removeClass("travel-active-link");
    //hide all content
    $(".table-content").addClass("uk-hidden");
    // //add color to active navlink
    $(this).addClass("travel-active-link");
    // //show active content
    let table = document.getElementsByClassName(e.currentTarget.id);
    $(table).removeClass("uk-hidden");
  });

  if (document.getElementById("user_roles")) {
    let roles = $("input#user_roles")
      .val()
      .split(" ");
    let temp = [];
    $("input#user_roles").val(JSON.stringify(roles));
    $("input.uk-checkbox").on("click", e => {
      if ($("input#administrator").is(":checked")) {
        $("input#administrator").attr({ checked: true });
      } else {
        $("input#administrator").attr({ checked: false });
        temp = [];
      }
      if ($("input#staff").is(":checked")) {
        $("input#staff").attr({ checked: true });
      } else {
        $("input#staff").attr({ checked: false });
        temp = [];
      }
      if ($("input#sales").is(":checked")) {
        $("input#sales").attr({ checked: true });
      } else {
        $("input#sales").attr({ checked: false });
        temp = [];
      }
      $("#checkbox label input[checked]").map((key, value) => {
        if ($.inArray(value.value, temp) == -1) temp.push(value.value);
      });
      $("input#user_roles").val(JSON.stringify(temp));
    });
    roles.map(role => {
      if (role == "ROLE_BACKOFFICE_ADMIN") {
        $("input#administrator").attr({ checked: true });
      } else if (role == "ROLE_BACKOFFICE_USER") {
        $("input#staff").attr({ checked: true });
      } else {
        $("input#sales").attr({ checked: true });
      }
    });
  }

  if (document.getElementById("user_enabled")) {
    let status = $("input#user_enabled").val();
    $("input.uk-radio").on("change", e => {
      if ($("input#true").is(":checked")) {
        $("input#user_enabled").val(true);
      } else {
        $("input#user_enabled").val(false);
      }
    });
    if (status == "true") {
      $("input#false").prop("checked", false);
      $("input#true").prop("checked", true);
    } else {
      $("input#true").prop("checked", false);
      $("input#false").prop("checked", true);
    }
  }

  if (document.getElementById("user_roles")) {
    let roles = $("input#user_roles")
      .val()
      .split(" ");
    let temp = [];
    $("input#user_roles").val(JSON.stringify(roles));
    $("input.uk-checkbox").on("click", e => {
      if ($("input#administrator").is(":checked")) {
        $("input#administrator").attr({ checked: true });
      } else {
        $("input#administrator").attr({ checked: false });
        temp = [];
      }
      if ($("input#staff").is(":checked")) {
        $("input#staff").attr({ checked: true });
      } else {
        $("input#staff").attr({ checked: false });
        temp = [];
      }
      if ($("input#sales").is(":checked")) {
        $("input#sales").attr({ checked: true });
      } else {
        $("input#sales").attr({ checked: false });
        temp = [];
      }
      $("#checkbox label input[checked]").map((key, value) => {
        if ($.inArray(value.value, temp) == -1) temp.push(value.value);
      });
      $("input#user_roles").val(JSON.stringify(temp));
    });
    roles.map(role => {
      if (role == "ROLE_BACKOFFICE_ADMIN") {
        $("input#administrator").attr({ checked: true });
      } else if (role == "ROLE_BACKOFFICE_USER") {
        $("input#staff").attr({ checked: true });
      } else {
        $("input#sales").attr({ checked: true });
      }
    });
  }

  if (document.getElementById("user_enabled")) {
    let status = $("input#user_enabled").val();
    $("input.uk-radio").on("change", e => {
      if ($("input#true").is(":checked")) {
        $("input#user_enabled").val(true);
      } else {
        $("input#user_enabled").val(false);
      }
    });
    if (status == "true") {
      $("input#false").prop("checked", false);
      $("input#true").prop("checked", true);
    } else {
      $("input#true").prop("checked", false);
      $("input#false").prop("checked", true);
    }
  }

  //handle icon image
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#iconimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#iconimg").change(function () {
    readURL(this);
  });

  //handle landing page image
  function landingreadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#landingpageimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#landingpageimg").change(function () {
    landingreadURL(this);
  });

  //handle category page image
  function categoryreadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#categorypageimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#categorypageimg").change(function () {
    categoryreadURL(this);
  });

  //active subnav all at themes
  if (window.location.pathname.includes("themes")) {
    $("#theme-nav-all").addClass("travel-active-link");
  }
  //handle add theme image
  function themereadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#themeimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#themeimg").change(function () {
    themereadURL(this);
  });

  //handle edit theme image
  function editthemereadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#editthemeimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#editthemeimg").change(function () {
    editthemereadURL(this);
  });

  //when save button is click
  $(".theme-pencil-icon").on("click", e => {
    $("#theme-editing-save-button").on("click", function () {
      if ($("#theme-enable-button").hasClass("uk-active")) {
        $(e.currentTarget.parentElement.children[1]).addClass("uk-hidden");
      } else {
        $(e.currentTarget.parentElement.children[1]).removeClass("uk-hidden");
      }
    });
  });

  // delete experience at theme

  $(".theme-delete-button").on("click", e => {
    e.preventDefault();
    var result = confirm("Are you sure?");
    console.log(result);
    if (result) {
      setTimeout(() => {
        $(e.currentTarget.parentElement.parentElement).remove();
      }, 500);
    }
  });

  //handle add feature image
  function addfeaturereadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#featureimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#featureimg").change(function () {
    addfeaturereadURL(this);
  });

  //handle edit feature image
  function editfeaturereadURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#editfeatureimg-output").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#editfeatureimg").change(function () {
    editfeaturereadURL(this);
  });

  //when save button is click
  $(".feature-pencil-icon").on("click", e => {
    $("#feature-editing-save-button").on("click", function () {
      if ($("#feature-enable-button").hasClass("uk-active")) {
        $(e.currentTarget.parentElement.children[1]).addClass("uk-hidden");
      } else {
        $(e.currentTarget.parentElement.children[1]).removeClass("uk-hidden");
      }
    });
  });

  // delete experience at feature

  $(".feature-delete-button").on("click", e => {
    e.preventDefault();
    var result = confirm("Are you sure?");
    console.log(result);
    if (result) {
      setTimeout(() => {
        $(e.currentTarget.parentElement.parentElement).remove();
      }, 500);
    }
  });

  //active subnav all at feature
  if (window.location.pathname.includes("featured")) {
    $("#feature-nav-all").addClass("travel-active-link");
  }

});
