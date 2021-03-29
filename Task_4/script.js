$(function () {
  const displayMessage = (message) => {
    $("#message").html(message);
    setTimeout(function () {
      $("#message").html("");
    }, 1500);
  };

  const validateAK = () => {
    let message = "";
    if ($("#form-subject").val() == "" && !$("#invalidCheck").is(":checked")) {
      message +=
        "<p class='alert alert-danger'>Fields a and k are required</p>";
      displayMessage(message);
    } else if (
      $("#form-subject").val() == "" &&
      $("#invalidCheck").is(":checked")
    ) {
      message += "<p class='alert alert-danger'>Field a is required</p>";
      displayMessage(message);
    } else if (
      $("#form-subject").val() != "" &&
      !$("#invalidCheck").is(":checked")
    ) {
      message += "<p class='alert alert-danger'>Field k is required</p>";
      displayMessage(message);
    }
  };

  const displayCDE = () => {
    $("input").on("click", function () {
      if ($("input:checked").val() == "no") {
        $("label:contains('c) First name')").hide();
        $("label:contains('d) Last name')").hide();
        $("label:contains('e) Email address')").hide();
        $("#first-name").hide();
        $("#last-name").hide();
        $("#email").hide();
      } else {
        $("label:contains('c) First name')").show();
        $("label:contains('d) Last name')").show();
        $("label:contains('e) Email address')").show();
        $("#first-name").show();
        $("#last-name").show();
        $("#email").show();
      }
    });
  };

  displayCDE();

  const isEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

  $("#email").blur(() => {
    if (!isEmail($("#email").val())) {
      displayMessage("<p class='alert alert-danger'>Email is not valid</p>");
    }
  });

  const sortCountry = () => {
    var select = $("select");
    select.html(
      select.find("option").sort(function (x, y) {
        return $(x).text() > $(y).text() ? 1 : -1;
      })
    );
    $("select").get(0).selectedIndex = 0;
  };

  sortCountry();

  const displayG = () => {
    $("#country").change(function () {
      let selectedCountry = $(this).children("option:selected").val();
      if (selectedCountry !== "Other Country") {
        $("#other-country").prev().hide();
        $("#other-country").hide();
      }
    });
  };

  displayG();

  const validateG = () => {
    if (
      $("#country option:selected").val() === "Other Country" &&
      $("#other-country").val().length < 3
    ) {
      let html =
        "<small class='alert alert-danger'>Password must be at least 3 characters</small>";
      $("#other-country").after(html);
      setTimeout(function () {
        $("#other-country").next().remove("small");
      }, 1500);
    }    
  };

  const validateIH = () => {
    if ($("#city").val().length == 0 || $("#zip").val().length == 0) {
      let html =
        "<small class='alert alert-danger'>Fields i and h are required.</small>";
      $("#city").after(html);

      setTimeout(function () {
        $("#city").next().remove("small");
      }, 1500);
    }
  };

  const limitChars = () => {
    const maxLength = 1000;
    $("#textarea").click(() => {
      $("#textarea").after(
        `<span id="count">${maxLength}</span> Character(s) Remaining        `
      );
    });
    $("#textarea").keyup(function () {
      let textLength = maxLength - $(this).val().length;
      $("#count").text(textLength);
    });
  };

  limitChars();

  function Get_All_Forms_Data(Element) {
    Element = Element || "";
    var All_Page_Data = {};
    var All_Forms_Data_Temp = {};
    if (!Element) {
      Element = "body";
    }

    $(Element)
      .find("input,select,textarea")
      .each(function (i) {
        All_Forms_Data_Temp[i] = $(this);
      });

    $.each(All_Forms_Data_Temp, function () {
      var input = $(this);
      var Element_Name;
      var Element_Value;

      if (input.attr("type") == "submit" || input.attr("type") == "button") {
        return true;
      }

      if (input.attr("name") !== undefined && input.attr("name") != "") {
        Element_Name = input.attr("name").trim();
      } else if (input.attr("id") !== undefined && input.attr("id") != "") {
        Element_Name = input.attr("id").trim();
      } else if (
        input.attr("class") !== undefined &&
        input.attr("class") != ""
      ) {
        Element_Name = input.attr("class").trim();
      }

      if (input.val() !== undefined) {
        if (input.attr("type") == "checkbox") {
          Element_Value = input
            .parent()
            .find('input[name="' + Element_Name + '"]:checked')
            .val();
        } else if (input.attr("type") == "radio") {
          Element_Value = $(
            'input[name="' + Element_Name + '"]:checked',
            Element
          ).val();
        } else {
          Element_Value = input.val();
        }
      } else if (input.text() != undefined) {
        Element_Value = input.text();
      }

      if (Element_Value === undefined) {
        Element_Value = "";
      }

      if (Element_Name !== undefined) {
        var Element_Array = new Array();
        if (Element_Name.indexOf(" ") !== -1) {
          Element_Array = Element_Name.split(/(\s+)/);
        } else {
          Element_Array.push(Element_Name);
        }

        $.each(Element_Array, function (index, Name) {
          Name = Name.trim();
          if (Name != "") {
            All_Page_Data[Name] = Element_Value;
          }
        });
      }
    });
    return All_Page_Data;
  }

  $("form").submit((e) => {
    validateAK();
    validateG();
    validateIH();
    console.log(Get_All_Forms_Data());
   

    e.preventDefault();
  });
});
