var boxNumber = 1;
const div = document.getElementById("main")

function createInput() {
    var input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("id", `b${boxNumber}`)
    div.append(input)
    boxNumber++
}

function Calc() {
    let values = []
    for (x=0; x<boxNumber; x++) {
        values.push(parseFloat(document.getElementById(`b${x}`).value))
    }
    
    var min = values[0]
    for (var i=0; i<values.length; i++) {
        if (values[i] < min) {
            min = values[i]
        }
    }
    
    var max = values[0]
    for (var i=0; i<values.length; i++) {
        if (values[i] > max) {
            max = values[i]
        }
    }

    var sum = 0
    for (var i=0; i<values.length; i++) {
        sum += values[i]
    }

    var mean = sum / values.length

    var answer = document.getElementById("answer")
    answer.innerHTML = `Min = ${min}<br>
    Max = ${max}<br>
    Sum = ${sum}<br>
    Mean = ${mean}`


}

setInterval(() => {
    Calc()
}, 1000)





    