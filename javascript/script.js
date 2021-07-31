const api_url = "https://jsonplaceholder.typicode.com/users";

async function getapi(url) {

    const response = await fetch(url);

    var data = await response.json();
    if (response) {
        hideloader();
    }
    show(data);
}
getapi(api_url);

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
var users;

function rowClicked(i) {

    var row = document.getElementById('hiddenRow' + i);
    var rowData = document.getElementById('hiddenRowData' + i);
    var tableRow = users[i].name + `  ` + users[i].email;

    if (i != 0) {
        tableRow += `<button onclick="rowClicked(` + (i - 1) + `)">Prev</button>`;
        document.getElementById('hiddenRow' + (i - 1)).style.display = "none";
    }
    if (i < users.length - 1) {
        tableRow += `<button onclick="rowClicked(` + (i + 1) + `)">Next</button>`;
        document.getElementById('hiddenRow' + (i + 1)).style.display = "none";
    }
    rowData.innerHTML = tableRow;
    row.style.display = "block";

}

function show(data) {

    users = data;

    let table =
        `<tr>
		<th>Id</th>
		<th>Name</th>
		<th>Email</th>
		<th>Phone</th>
		</tr>`;
    var i = 0;
    for (var r of data) {
        table += `<tr onclick="rowClicked(` + i + `)" >
	    <td>${r.id} </td>
	    <td>${r.name}</td>
	    <td>${r.email}</td>
	    <td>${r.phone}</td>		
        </tr>`;

        table += `<tr class="hidden_row" id="hiddenRow` + i + `"><td colspan=4  id="hiddenRowData` + i + `"></td></tr>`
        i++;
    }
    document.getElementById("users").innerHTML = table;
}