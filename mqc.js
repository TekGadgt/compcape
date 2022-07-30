var title = document.getElementById("title");
var tracker = document.getElementById("tracker");
var doneProgress = document.getElementById("doneProgress");
var closeProgress = document.getElementById("closeProgress");
var notDoneProgress = document.getElementById("notDoneProgress");

function htmlTemplate(title, url, type, done, close) {
  return `<div class="row mt-2">
            <div class="card bg-dark">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title">
                      <a href="${url}" class="link-light" target="_blank">${title}</a>
                    </h5>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <p>${type}</p>
                      </div>
                      <div class="col">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="${title
                            .split(" ")
                            .join("-")}-done" ${done ? "checked" : ""} disabled>
                          <label class="form-check-label text-light" style="opacity: 1;" for="${title
                            .split(" ")
                            .join("-")}-done">
                              Done?
                          </label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="${title
                          .split(" ")
                          .join("-")}-close" ${close ? "checked" : ""} disabled>
                        <label class="form-check-label text-light" style="opacity: 1;" for="${title
                          .split(" ")
                          .join("-")}-close">
                            Close?
                        </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

fetch(`/.netlify/functions/lookup?cape=mqc`)
  .then((response) => response.json())
  .then((responseJSON) => {
    var doneCount = [];
    var closeCount = [];

    for (i = 0; i < responseJSON.length; i++) {
      if (responseJSON[i].done === true) {
        doneCount.push(responseJSON[i].done);
      }
      if (responseJSON[i].close === true) {
        closeCount.push(responseJSON[i].close);
      }

      tracker.innerHTML += htmlTemplate(
        responseJSON[i].title,
        responseJSON[i].url,
        responseJSON[i].type,
        responseJSON[i].done,
        responseJSON[i].close
      );
    }

    var currentDoneProgress = Math.round(
      (doneCount.length / responseJSON.length) * 100
    );
    doneProgress.style.width = currentDoneProgress + "%";
    doneProgress.innerHTML = currentDoneProgress + "%";
    doneProgress.setAttribute("aria-valuenow", currentDoneProgress);

    var currentCloseProgress = Math.round(
      (closeCount.length / responseJSON.length) * 100
    );
    closeProgress.style.width = currentCloseProgress + "%";
    closeProgress.innerHTML = currentCloseProgress + "%";
    closeProgress.setAttribute("aria-valuenow", currentCloseProgress);

    var currentNotDoneProgress =
      100 - (currentDoneProgress + currentCloseProgress);
    notDoneProgress.style.width = currentNotDoneProgress + "%";
    notDoneProgress.innerHTML = currentNotDoneProgress + "%";
    notDoneProgress.setAttribute("aria-valuenow", currentNotDoneProgress);
  });