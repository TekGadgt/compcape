var title = document.getElementById('title')
var tracker = document.getElementById('tracker')
var doneProgress = document.getElementById('doneProgress')
var closeProgress = document.getElementById('closeProgress')
var notDoneProgress = document.getElementById('notDoneProgress')

function htmlTemplate(title, url, done, close) {
    return `<div class="row mt-2">
                <div class="card bg-dark">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title"><a href="${url}" class="link-light" target="_blank">${title}</a></h4>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="${title.split(' ').join('-')}-done" ${done ? 'checked' : ''} disabled>
                                            <label class="form-check-label text-light" style="opacity: 1;" for="${title.split(' ').join('-')}-done">
                                                Done?
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="${title.split(' ').join('-')}-close" ${close ? 'checked' : ''} disabled>
                                            <label class="form-check-label text-light" style="opacity: 1;" for="${title.split(' ').join('-')}-close">
                                                Close?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

fetch(`/.netlify/functions/lookup`)
    .then((response) => response.json())
    .then((responseJSON) => {
        results = responseJSON.results;

        var doneCount = []
        var closeCount = []

        for (i = 0; i < results.length; i++) {
            if (results[i].properties["Done?"].checkbox === true) {
                doneCount.push(results[i].properties["Done?"].checkbox)
            }
            if (results[i].properties["Close?"].checkbox === true) {
                closeCount.push(results[i].properties["Done?"].checkbox)
            }

            tracker.innerHTML += htmlTemplate(results[i].properties["Name"].title[0].plain_text, results[i].properties["URL"].url, results[i].properties["Done?"].checkbox, results[i].properties["Close?"].checkbox)
        }

        var currentDoneProgress = Math.round((doneCount.length / results.length) * 100)
        doneProgress.style.width = currentDoneProgress + "%"
        doneProgress.innerHTML = currentDoneProgress + "%"
        doneProgress.setAttribute("aria-valuenow", currentDoneProgress)

        var currentCloseProgress = Math.round((closeCount.length / results.length) * 100)
        closeProgress.style.width = currentCloseProgress + "%"
        closeProgress.innerHTML = currentCloseProgress + "%"
        closeProgress.setAttribute("aria-valuenow", currentCloseProgress)

        var currentNotDoneProgress = 100 - (currentDoneProgress + currentCloseProgress)
        notDoneProgress.style.width = currentNotDoneProgress + "%"
        notDoneProgress.innerHTML = currentNotDoneProgress + "%"
        notDoneProgress.setAttribute("aria-valuenow", currentNotDoneProgress)
    })