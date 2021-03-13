<template>
  <div class="about">
    <h1>Timers page</h1>

    <input type="button" value="Add Row" @click="addRow('dataTable')" />
    <input type="button" value="Delete Row" @click="deleteRow('dataTable')" />

    <table id="dataTable" width="350px" border="1">
      <tr>
        <td><input type="checkbox" name="chk"/></td>
        <td> 1 </td>
        <td> <input type="text" /> </td>
      </tr>
    </table>

  </div>
</template>
<script>
export default {
  name: 'Timers',
  components: {},
  data() {
    return {

    }
  },
  methods: {
    	addRow(tableID) {

			var table = document.getElementById(tableID);

			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);

			var cell1 = row.insertCell(0);
			var element1 = document.createElement("input");
			element1.type = "checkbox";
			element1.name="chkbox[]";
			cell1.appendChild(element1);

			var cell2 = row.insertCell(1);
			cell2.innerHTML = rowCount + 1;

			var cell3 = row.insertCell(2);
			var element2 = document.createElement("input");
			element2.type = "text";
			element2.name = "txtbox[]";
			cell3.appendChild(element2);

		},
		deleteRow(tableID) {
			try {
			var table = document.getElementById(tableID);
			var rowCount = table.rows.length;

			for(var i=0; i<rowCount; i++) {
				var row = table.rows[i];
				var chkbox = row.cells[0].childNodes[0];
				if(null != chkbox && true == chkbox.checked) {
					table.deleteRow(i);
					rowCount--;
					i--;
				}


			}
			}catch(e) {
				alert(e);
			}
		}
  }
}
</script>
