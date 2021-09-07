$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['bot'] = {
  init: function () {
      this.appendDummyInput().appendField("Bot", "name");
          
      this.appendStatementInput("Content").setCheck(null);

      this.setInputsInline(false);
      this.setColour(315);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks['questions'] = {
  init: function () {

      this.appendDummyInput()
      .appendField('Questions')
      .appendField(new Blockly.FieldDropdown([
          ['Ask me a question.', 'ITEM0'],
          ['What is the date today?', 'ITEM1'],
          ['What is the time now?', 'ITEM2'],
          ['How are you?', 'ITEM3'],
          ['What is javascript', 'ITEM4'],
          ['What is your name?', 'ITEM5']
      ]), 'question');
      
      this.setPreviousStatement(true); 
      this.setColour(315);

      //others
      this.setTooltip("Custom block to answers your questions");
      this.setHelpUrl("");
  }
};

Blockly.JavaScript['questions'] = function (block) {
  var q = block.getFieldValue('question');
  return q;
};

Blockly.JavaScript['bot'] = function (block) {

  var q = Blockly.JavaScript.statementToCode(block, 'Content');
  var ans = "";

  if(q === "  ITEM0"){
      ans = "No question asked, please try again";
  }

  else if(q === "  ITEM1"){
      var date = new Date().getDate() + "/" + new Date().getMonth() + "/"  + new Date().getFullYear()
      ans = 'Today\'s Date ' + date;
  }

  else if(q === "  ITEM2"){
      var time = new Date().getHours() + ":" + new Date().getMinutes() + ":"  + new Date().getSeconds()
      ans = 'Time:  ' + time;
  }

  else if(q === "  ITEM3"){
      ans = 'I am fine thank you, but will be better once I get his internship!!';
  }

  else if(q === "  ITEM4"){
      ans = 'JavaScript is a very fun language, used by aliens to communicate.';
  }

  else if(q === "  ITEM5"){
      ans = 'My name is Blockly Bot!!';
  }

  else{
      ans = "Not working"
  }

  return '"'+ans+'"';
}


var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
}
