export class Game {
  knightPosition = [1, 7];
  observers = [];
  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  moveKnight(toX, toY) {
    this.knightPosition = [toX, toY];
    this.emitChange();
  }
  canMoveKnight(toX, toY) {
    const [x, y] = this.knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    console.log("canMoveKnight is called");

    /*let validAPI = "/api/project/moveValidity/" + dx + "/" + dy;
    if (process.env.NODE_ENV !== "production") {
      validAPI =
        "http://localhost:7229/api/project/moveValidity/" + dx + "/" + dy;
    }
    fetch(validAPI, {
      method: "GET",
      headers: {*/
    //Accept: "application/json, text/plain, */*",
    /*"Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        response.text().then((text) => {
          throw Error(response.statusText + ": " + text);
        });
      } else {
        response.json().then((result) => {
          console.log("\n" + "result.isValid: " + result.isValid + "\n");
          //setTimeout(() => {
            return result.isValid;
          }, 1000);
          return result.isValid;
        });
      }
    });*/

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  emitChange() {
    const pos = this.knightPosition;
    this.observers.forEach((o) => o && o(pos));
  }
}
