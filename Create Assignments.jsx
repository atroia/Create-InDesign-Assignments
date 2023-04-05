/* --------------------------------------
Create Assignments
by Aaron Troia (@atroia)
Modified Date: 4/4/23

Description: 
Create assignments from an text input

Issues needing to be addressed:

change log

-------------------------------------- */

var doc = app.activeDocument;
var docName = doc.name;

main();

function main(){
  try {
    if (app.documents.length == 0) {
      alert("No documents are open.");
    } else {
      createAssignments();
    }
  } catch (e) {
    alert(e.line);
  }
}

function createAssignments(){
  var assignment = [];
  var asgnName = [];
  var docPath = doc.filePath.absoluteURI;

  // Split document name to get 20 chars needed for Assignments folder
  var split = docName.split(".");
  var filename = split[0];
  if (filename.length > 20) {
    filename = filename.substring(0, 20);
  }
  var storyPath = docPath + "/" + filename + " Assignments/";

  // Text Input Dialog Box
  var win = new Window("dialog", "Create Assignments from a List");
  // win.alignChildren = "left";
  win.input = win.add("group");
  win.input.alignChildren = "top";
  win.input.txt = win.input.add("edittext", undefined, undefined, {
    multiline: true,
  });
  win.input.txt.encoding = "UTF8";
  win.input.txt.minimumSize = [300, 300];
  win.buttons = win.add("group");
  win.buttons.alignChildren = "center";
  win.buttons.ok = win.buttons.add("button", undefined, "OK");
  win.buttons.cancel = win.buttons.add("button", undefined, "Cancel");
  win.show();
  asgnName = win.input.txt.text.split(/\n/);

  // Create Assignments
  for (var i = 0; i < asgnName.length; i++) {
    var userColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    var assignmentFile = new File(storyPath + asgnName[i] + ".icma");
    assignment.push(
      doc.assignments.add(assignmentFile, undefined, false, {
        name: asgnName[i],
        frameColor: userColor,
        includeLinksWhenPackage: true,
        exportOption: AssignmentExportOptions.ASSIGNED_SPREADS,
        assignmentFileStatus: AssignmentStatus.ASSIGNMENT_UP_TO_DATE
      })
    );
    assignment[i].update();
  }
}