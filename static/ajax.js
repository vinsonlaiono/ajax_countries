// Code needs to be refactored
// Need to keep track of the current filter settings of the page on refresh

$(document).ready(function () {
    // URLS
    var search_url = "/search",
        filter = "/filter/",
        cities = "/cities",
        page = 1

    // Function to build query restults for countries
    var countries_ajaxcall = function (url) {
        $.ajax({
            url: url,
            method: 'POST',
            data: $('#myForm').serialize()
        })
            .done(function (res) {
                console.log(res)
                if (res['countries'].length > 0) {
                    var response = ""
                    for (var i = 0; i < res['countries'].length; i++) {
                        response += "<tr>"
                            + '<td scope="row">' + res['countries'][i]['name'] + '</td>'
                            + '<td scope="row">' + res['countries'][i]['continent'] + '</td>'
                            + '<td scope="row">' + res['countries'][i]['region'] + '</td>'
                            + "</tr>"
                    };
                    $('#countryList').html(response);
                    $('#nameVal').html("Country Name")
                    $('#error').html("");
                } else {
                    response = '<div class="alert alert-danger mt-4" role="alert"> There is no match for that country </div>'
                    $('#error').html(response);
                    $('#countryList').html("");

                }
            })
        return false;
    }
    // Function to build query restults for cities
    var cities_ajaxcall = function (url) {
        $.ajax({
            url: url,
            method: 'POST',
            data: $('#myForm').serialize()
        })
            .done(function (res) {
                if (res['cities'].length > 0) {
                    var response = ""
                    for (var i = 0; i < res['cities'].length; i++) {
                        response += "<tr>"
                            + '<td scope="row">' + res['cities'][i]['name'] + '</td>'
                            + '<td scope="row">' + res['cities'][i]['district'] + '</td>'
                            + '<td scope="row">' + res['cities'][i]['population'] + '</td>'
                            + "</tr>"
                    }
                    $('#change').html("District")
                    $('#change1').html("Population")
                    $('#countryList').html(response)
                    $('#nameVal').html("City Name")
                    $('#error').html("");

                } else {
                    response = '<div class="alert alert-danger mt-4" role="alert"> There is no match for that city </div>'
                    $('#error').html(response);
                    $('#countryList').html("");

                }
            })
        return false;
    }
    // Initial ajax call to populate list of countries.
    countries_ajaxcall(search_url)
    // Load search results on key up
    $('#search').keyup(function () {
        val = $('#nameVal').html()
        if( val == "City Name"){
            cities_ajaxcall(cities)
        } else {
            countries_ajaxcall(search_url)
        }
    });
    // QUERY for A-Z
    $('.filtera').click(function () {
        var f = $('.filtera').val()
        countries_ajaxcall(filter + f)
    })
    // QUERY for Z-A
    $('.filterz').click(function () {
        var f = $('.filterz').val()
        countries_ajaxcall(filter + f)
    })
    // QUERY for ALL countrires
    $('#allCountries').click(function () {
        countries_ajaxcall(search_url)
    })
    // Funtion QUERY for all cities

    $('#allCities').click(function () {
        cities_ajaxcall(cities)
    })
}) //end of document.ready