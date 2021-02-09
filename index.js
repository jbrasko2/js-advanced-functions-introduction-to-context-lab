// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr){
    let records = arr.map((employee => createEmployeeRecord(employee)))
    return records
}

function createTimeInEvent(employee, timeString) {
    let [date, hour] = timeString.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })
    return employee
}

function createTimeOutEvent(employee, timeString) {
    let [date, hour] = timeString.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })
    return employee
}

function hoursWorkedOnDate(employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, soughtDate) {
    return hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour
}

function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = allDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

function calculatePayroll(employees) {
    return employees.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(arr, firstName) {
    return arr.find(function(e) {
        return e.firstName === firstName
    })
}