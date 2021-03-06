var wkndr = {

  fetchCampsites: function(e) {
    e.preventDefault()
    const campsiteName = e.target.querySelector("#campsite-name").value // grab campsite name from input
    $.get("/campsites?campsite=" + campsiteName).then(this.renderCampsites, function(err) {
      $("#campsites-container").html("Try searching for something different.")
    })

  },

  renderCampsites: function(response) { // xhr request
    console.log("success")
    let html = new String()
    if (response instanceof Array) { // determine if res is a single object or a collection
      const campsites = response
      campsites.forEach(function(campsite) {
        html += HandlebarsTemplates['campsites/index'](campsite) // current solution as handelbars partials don't enjoy the asset pipeline
      })
    } else if (response instanceof Object) {
      const campsite = response
      html = HandlebarsTemplates['campsites/index'](campsite)
    } else { html = "No results found." }
    $("#campsites-container").html(html)
  }

}
