//1: linear search; 2: binary search; 3: selection sort; 4: bubble sort;
let datasetArray = [];
let algoritm;
let resultIndex;
let resultValue;
let searchItem;

//set random integer
document.getElementById("btnRandomInteger").onclick = function() {
  let html = "";
  let datasetSize = document.getElementById("inputDatasetSize").value;
  if (datasetSize > 15) {
    alert("Please select less than 15");
    return false;
  }
  if (datasetSize > 1) {
    for (let i = 0; i < datasetSize; i++) {
      //random number from 1 to 1000
      let number = Math.floor(Math.random() * 1000) + 1;
      datasetArray.push(number);
      html +=
        '<span class="badge badge-info ctm-badge m-2" id="box_' +
        i +
        "_" +
        number +
        '">' +
        number +
        "</span>";
    }
  } else {
    alert("Please enter value between 2 to 100");
    datasetArray = [];
    html = "";
  }

  document.getElementById("dataSetPreview").innerHTML = html;
};

//set linear search algoritm
document.getElementById("radioLinearSearch").onchange = function() {
  toggleInputSearch(this.value);
  algoritm = this.value;
};

//set binary search algoritm
document.getElementById("radioBinarySearch").onchange = function() {
  toggleInputSearch(this.value);
  algoritm = this.value;
};

//set selection sort algoritm
document.getElementById("radioSelectionSort").onchange = function() {
  toggleInputSearch(this.value);
  algoritm = this.value;
};

//set bubble sort algoritm
document.getElementById("radioBubbleSort").onchange = function() {
  toggleInputSearch(this.value);
  algoritm = this.value;
  //clear html
};

//Run algorithm on click
document.getElementById("btnRunAlgorithm").onclick = function() {
  //validate data set
  if (datasetArray.length < 1) {
    alert("Please select dataset.");
    document.getElementById("inputDatasetSize").focus();
    return false;
  }
  //validate algorithm selected
  if (algoritm == undefined) {
    alert("Please select algorithm.");
    return false;
  }
  //if search then validate input search
  searchItem = document.getElementById("inputSearchValue").value;
  if (algoritm == 1 || algoritm == 2) {
    if (searchItem.trim() == "") {
      alert("Please enter value to search.");
      document.getElementById("inputSearchValue").focus();
      return false;
    }
  }
  //empty html
  document.getElementById("resultIndex").innerHTML = "";
  //validate algoritm
  toggleDisableButton();

  if (algoritm == 1) {
    linearSearch(datasetArray, searchItem);
  } else if (algoritm == 2) {
    binarySearch(datasetArray, searchItem);
  } else if (algoritm == 3) {
    selectionSort(datasetArray);
  } else if (algoritm == 4) {
    bubbleSort(datasetArray);
  }
};

//reset button click
document.getElementById("btnResetAlgorithm").onclick = function() {
  datasetArray = [];
  algoritm = undefined;
  resultIndex = null;
  resultValue = null;
  document.getElementById("inputDatasetSize").value = "";
  document.getElementById("inputSearchValue").value = "";
  document.getElementById("dataSetPreview").innerHTML = "";
  document.getElementById("sortedPreview").innerHTML = "";
  document.getElementById("resultIndex").innerHTML = "";

  toggleInputSearch();
  let r = document.getElementsByName("algorithm");
  for (let i = 0; i < r.length; i++) {
    if (r[i].checked == true) {
      r[i].checked = false;
      break;
    }
  }
};

//toggle input search
function toggleInputSearch(value) {
  if (value == 1 || value == 2) {
    document.getElementById("inputSearchValue").style.display = "block";
  } else {
    document.getElementById("inputSearchValue").style.display = "none";
  }
}

function resetAlgoritm() {
  //reset algorithm
  if (resultIndex != null) {
    document.getElementById(
      "box_" + resultIndex + "_" + resultValue
    ).style.backgroundColor = "";
    document.getElementById("sortedPreview").innerHTML = "";
    resultIndex = null;
    resultValue = null;
  }
}

//linear Search algorithm
function linearSearch(array, element) {
  //reset algorithm
  if (resultIndex) {
    document.getElementById(
      "box_" + resultIndex + "_" + resultValue
    ).style.backgroundColor = "";
    document.getElementById("sortedPreview").innerHTML = "";
    resultIndex = null;
    resultValue = null;
  }

  //run algorithm
  for (var i = 0; i < array.length; i++) {
    if (array[i] == element) {
      resultIndex = i;
      resultValue = array[i];
      break;
    }
  }
  //show Visualization
  animationIndex = 0;
  let runInterval = setInterval(() => {
    //clear last active color
    if (array[animationIndex - 1]) {
      document.getElementById(
        "box_" + (animationIndex - 1) + "_" + array[animationIndex - 1]
      ).style.backgroundColor = "";
    }
    //add current active color
    if (array[animationIndex]) {
      document.getElementById(
        "box_" + animationIndex + "_" + array[animationIndex]
      ).style.backgroundColor = "#db4c3f";
      //clear if we got result value
      if (animationIndex == resultIndex) {
        document.getElementById("resultIndex").innerHTML = resultIndex;
        toggleDisableButton();
        clearInterval(runInterval);
      }
    } else {
      document.getElementById("resultIndex").innerHTML = "Not Found.";
      toggleDisableButton();
      clearInterval(runInterval);
    }
    //else continue
    animationIndex++;
    // if (animationIndex > array.length) {
    //   document.getElementById("resultIndex").innerHTML = "Not Found.";
    //   clearInterval(runInterval);
    // }
  }, 1000);
}

//linear Search algorithm
function binarySearch(array, element) {
  //reset algorithm
  if (resultIndex != null) {
    document.getElementById(
      "box_" + resultIndex + "_" + resultValue
    ).style.backgroundColor = "";
    document.getElementById("sortedPreview").innerHTML = "";
    resultIndex = null;
    resultValue = null;
  }

  //run algorithm
  array.sort(function(a, b) {
    return a - b;
  });
  let lowIndex = 0;
  let highIndex = array.length - 1;
  let visualAlgo = [];
  while (lowIndex <= highIndex) {
    let midIndex = Math.floor((lowIndex + highIndex) / 2);
    visualAlgo.push({ mid: midIndex, low: lowIndex, high: highIndex });
    if (array[midIndex] == element) {
      resultIndex = midIndex;
      resultValue = array[midIndex];
      break;
    } else if (array[midIndex] < element) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }

  //show Visualization
  let html = "";
  for (let i = 0; i < array.length; i++) {
    html +=
      '<span class="badge badge-info ctm-badge m-2" id="box_' +
      i +
      "_" +
      array[i] +
      '">' +
      array[i] +
      "</span>";
  }
  document.getElementById("dataSetPreview").innerHTML = html;
  animationIndex = 0;
  let runInterval = setInterval(() => {
    let lastAlgo = visualAlgo[animationIndex - 1];
    let algo = visualAlgo[animationIndex];
    if (lastAlgo) {
      document.getElementById(
        "box_" + lastAlgo.low + "_" + array[lastAlgo.low]
      ).style.backgroundColor = "";
      document.getElementById(
        "box_" + lastAlgo.mid + "_" + array[lastAlgo.mid]
      ).style.backgroundColor = "";
      document.getElementById(
        "box_" + lastAlgo.high + "_" + array[lastAlgo.high]
      ).style.backgroundColor = "";
    }

    if (algo) {
      document.getElementById(
        "box_" + algo.low + "_" + array[algo.low]
      ).style.backgroundColor = "#db4c3f";
      document.getElementById(
        "box_" + algo.mid + "_" + array[algo.mid]
      ).style.backgroundColor = "#28a745";
      document.getElementById(
        "box_" + algo.high + "_" + array[algo.high]
      ).style.backgroundColor = "#db4c3f";
    } else {
      if (resultIndex != null) {
        document.getElementById(
          "box_" + resultIndex + "_" + resultValue
        ).style.backgroundColor = "#28a745";
        document.getElementById("resultIndex").innerHTML = resultIndex;
      } else {
        document.getElementById("resultIndex").innerHTML = "Not Found.";
      }
      toggleDisableButton();
      clearInterval(runInterval);
    }

    animationIndex++;
  }, 1000);
}

//selection Sort algorithm
function selectionSort(array) {
  //reset algorithm
  if (resultIndex != null) {
    document.getElementById(
      "box_" + resultIndex + "_" + resultValue
    ).style.backgroundColor = "";
    resultIndex = null;
    resultValue = null;
  }
  document.getElementById("sortedPreview").innerHTML = "";

  let sortedArray = [...array];
  let len = sortedArray.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (sortedArray[min] > sortedArray[j]) {
        min = j;
      }
    }
    if (min !== i) {
      let tmp = sortedArray[i];
      sortedArray[i] = sortedArray[min];
      sortedArray[min] = tmp;
    }
  }

  const tempArray = [...datasetArray];
  let i = 0;
  let j = i + 1;
  let min = i;
  let lastActive;
  let lastGreen;
  let runInterval = setInterval(() => {
    let p = document.getElementById("dataSetPreview");
    let c = p.getElementsByClassName("badge-info");

    if (c[i]) {
      c[i].style.backgroundColor = "#ffc107";
    }

    if (j < len) {
      if (c[j - 1]) {
        if (i != j - 1) {
          c[j - 1].style.backgroundColor = "";
        }
      }
      c[j].style.backgroundColor = "#db4c3f";
      lastActive = j;
      if (tempArray[min] > tempArray[j]) {
        min = j;
        lastGreen = j;
      }
      j++;
    } else if (i < len) {
      if (min !== i) {
        let tmp = tempArray[i];
        tempArray[i] = tempArray[min];
        tempArray[min] = tmp;
      }
      document.getElementById("sortedPreview").innerHTML +=
        '<span class="badge badge-success ctm-badge m-2" id="box_' +
        i +
        "_" +
        sortedArray[i] +
        '">' +
        sortedArray[i] +
        "</span>";
      i++;
      j = i + 1;
      min = i;
      lastGreen = undefined;
      y = document.getElementsByClassName("badge-info");
      for (k = 0; k < y.length; k++) {
        y[k].style.backgroundColor = "";
      }

      //html
      let html = "";
      for (let z = 0; z < tempArray.length; z++) {
        html +=
          '<span class="badge badge-info ctm-badge m-2" id="box_' +
          z +
          "_" +
          tempArray[z] +
          '">' +
          tempArray[z] +
          "</span>";
      }
      document.getElementById("dataSetPreview").innerHTML = html;
    } else {
      toggleDisableButton();
      clearInterval(runInterval);
    }
  }, 1000);
}

//bubble Sort algorithm
function bubbleSort(array) {
  //reset algorithm
  if (resultIndex != null) {
    document.getElementById(
      "box_" + resultIndex + "_" + resultValue
    ).style.backgroundColor = "";
    resultIndex = null;
    resultValue = null;
  }
  document.getElementById("sortedPreview").innerHTML = "";

  let sortedArray = [...array];
  let len = sortedArray.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          let tmp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = tmp;
          swapped = true;
        }
      }
    }
  } while (swapped);

  let i = 0;
  let j = 0;
  let tempArray = [...datasetArray];
  let swipeLoop = false;
  let runInterval = setInterval(() => {
    if (j + 1 < len) {
      let p = document.getElementById("dataSetPreview");
      let c = p.getElementsByClassName("badge-info");
      if (c[j - 1]) {
        c[j - 1].style.backgroundColor = "";
      }

      if (c[j - 2]) {
        c[j - 2].style.backgroundColor = "";
      }

      c[j].style.backgroundColor = "#db4c3f";
      c[j + 1].style.backgroundColor = "#db4c3f";

      if (tempArray[j + 1]) {
        if (tempArray[j] > tempArray[j + 1]) {
          let tmp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = tmp;
          swipeLoop = true;
        }
      }

      j++;
    } else if (i < len) {
      let html = "";
      let html2 = "";
      for (let z = 0; z < tempArray.length; z++) {
        html +=
          '<span class="badge badge-info ctm-badge m-2" id="box_' +
          z +
          "_" +
          tempArray[z] +
          '">' +
          tempArray[z] +
          "</span>";

        html2 +=
          '<span class="badge badge-success ctm-badge m-2" id="box_' +
          z +
          "_" +
          tempArray[z] +
          '">' +
          tempArray[z] +
          "</span>";
      }
      document.getElementById("dataSetPreview").innerHTML = html;
      document.getElementById("sortedPreview").innerHTML += html2 + "<br>";
      if (swipeLoop == false) {
        document.getElementById("sortedPreview").innerHTML += "End swiped.";
        toggleDisableButton();
        clearInterval(runInterval);
      } else {
        swipeLoop = false;
      }
      j = 0;
      i++;
    } else {
      document.getElementById("sortedPreview").innerHTML += "End swiped.";
      toggleDisableButton();
      clearInterval(runInterval);
    }
  }, 1000);
}

function toggleDisableButton() {
  if (document.getElementById("btnRandomInteger").disabled == false) {
    document.getElementById("btnRandomInteger").disabled = true;
    document.getElementById("btnRunAlgorithm").disabled = true;
    document.getElementById("btnResetAlgorithm").disabled = true;
    document.getElementById("inputDatasetSize").disabled = true;

    document.getElementById("radioLinearSearch").disabled = true;
    document.getElementById("radioBinarySearch").disabled = true;
    document.getElementById("radioSelectionSort").disabled = true;
    document.getElementById("radioBubbleSort").disabled = true;
  } else {
    document.getElementById("btnRandomInteger").disabled = false;
    document.getElementById("btnRunAlgorithm").disabled = false;
    document.getElementById("btnResetAlgorithm").disabled = false;
    document.getElementById("inputDatasetSize").disabled = false;

    document.getElementById("radioLinearSearch").disabled = false;
    document.getElementById("radioBinarySearch").disabled = false;
    document.getElementById("radioSelectionSort").disabled = false;
    document.getElementById("radioBubbleSort").disabled = false;
  }
}
