function createEmployeeRecord(arr) {
    //declare object variable that will be pushed to employees array 
    let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

createEmployeeRecord(arr);

function createEmployeeRecords(arr) {
    let employeeRecords = [];
    arr.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee));
    });
    return employeeRecords;
}

createEmployeeRecords(arr);

function createTimeInEvent(employeeRecord, timeStamp) {
    let [date, time] = timeStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

createTimeInEvent(employeeRecord, timeStamp);

function createTimeOutEvent(employeeRecord, timeStamp) {

    let [date, time] = timeStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })

    return employeeRecord;
}

createTimeOutEvent(employeeRecord, timeStamp);

function hoursWorkedOnDate(employeeRecord, formDate) {

    let timeIn = employeeRecord.timeInEvents.find(obj => obj.date === formDate);

    let timeOut = employeeRecord.timeOutEvents.find(obj => obj.date === formDate);

    let hoursWorked = (timeOut.hour - timeIn.hour) * 0.01;

    return hoursWorked;

}

function wagesEarnedOnDate(employeeRecord, formDate) {

    let wage = hoursWorkedOnDate(employeeRecord, formDate) * employeeRecord.payPerHour;

    return wage;

}

function allWagesFor(employeeRecord) {

    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    return datesWorked.reduce((previous, current) => previous + wagesEarnedOnDate(employeeRecord, current), 0)

}

function calculatePayroll(employeeRecords) {

    let payroll = [];

    employeeRecords.forEach(employee => payroll.push(allWagesFor(employee)))

    return payroll.reduce((previous, current) => previous + current, 0);
}