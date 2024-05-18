class DHTML {
  constructor() {
    // positions = [outside, openTag, closeTag, inTag]
    this.readerLocation = "outside";
    this.readerPos = { x: 0, y: 0 };
    this.isFirstChar = false;
    this.dom = new Map();
  }

  write(stringsArr, ...values) {
    // console.log(stringsArr);
    // console.log(values);
    this.reader(stringsArr);
  }

  reader(stringsArr) {
    stringsArr.forEach((string) => {
      // If not in a tag area skip whitespace
      for (let char of string) {
        if (!this.isWhiteSpace(char) && this.isValidChar(char)) {
          console.log({ char, loc: this.readerLocation });
        }
      }
    });
  }

  isValidChar(char) {
    const validator = {
      openTag: /[^>&\/!]/,
      inTag: /[^>]/,
      closeTag: /[^<&!]/,
      outside: /[^>]/,
    };
    if (validator[this.readerLocation].test(char)) {
      if (char === "<") {
        switch (this.readerLocation) {
          case "outside":
            this.readerLocation = "openTag";
            break;
          case "inTag":
            this.readerLocation = "closeTag";
            break;
        }
      } else if (char === ">") {
        switch (this.readerLocation) {
            case "openTag":
              this.readerLocation = "inTag";
              break;
            case "closeTag":
              this.readerLocation = "outside";
              break;
          }
      }
      return true;
    }
    throw new Error(`${char} is invalid at current position`);
  }

  isWhiteSpace(char) {
    const whitespacePattern = /\s/;
    if (
      !["openTag", "closeTag", "inTag"].includes(this.readerLocation) &&
      whitespacePattern.test(char)
    ) {
      return true;
    }
    return false;
  }

  isSelfClosing(tag) {
    const selfClosingTags = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];
    return selfClosingTags.includes(tag);
  }

  tagCheck(tag) {}
}

export const dhtml = new DHTML();

const placeholder = "Cat";

dhtml.write`

<div class="Peter"> <p>
    <h1>${placeholder}</h1>
    </p>
</div>`;
