const { expect } = require('chai');
const checkIfFile = require('../parser');
const path = "C:\\Users\\MMast\\Desktop\\js\\lab4\\zad2\\text.txt"

describe('checkIfFile test', () => {
  it('return path and information that it is directory', () => {
    expect(checkIfFile("..")).to.equal('.. is a directory!');
  });

  it('returns information of file and its content', () => {
    expect(checkIfFile(path)).to.equal(`${path} is a file with content:\nRandom text in console :D\r\n31313gfat`);
  });
});