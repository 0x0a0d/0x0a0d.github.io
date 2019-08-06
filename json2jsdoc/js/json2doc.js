import $ from 'jquery';
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/javascript/javascript'
import Json2JSDoc from 'json2jsdoc'
$(function () {
  const defaultSize = ( window.innerWidth < 768 ) ? 200 : 400;

  const input = CodeMirror.fromTextArea(document.querySelector('#json-input'), {
    lineNumbers: true,
    json: true,
    styleActiveLine: true
  });
  const output = CodeMirror.fromTextArea(document.querySelector('#json-output'), {
    lineNumbers: true,
    styleActiveLine: true
  });
  input.setSize('100%', defaultSize);
  output.setSize('100%', defaultSize);
  $('#btn-convert').on('click', function (e) {
    e.preventDefault();
    try {
      const json = JSON.parse(input.getValue());
      const namespace = $('#namespace').val();
      const memberOf = $('#memberOf').val();
      const converter = new Json2JSDoc(json, {
        namespace: namespace === '' ? 'json2JSDoc' : namespace,
        memberOf,
        break_line: '\r\n'
      });
      const jsdoc = converter.convert().export();
      console.log(jsdoc);
      output.setValue(jsdoc);
    } catch (e) {
      console.error(e);
    }
  })
});
