class UtilServiceBase {
  capitalizeFirstLetter(itemString: string) {
    if (itemString && typeof itemString === "string") {
      return itemString.substr(0, 1).toLocaleUpperCase() + "" + itemString.substr(1);
    }
    return itemString;
  }

  private timeoutHolder: Record<string, NodeJS.Timeout> = {};
  debounceAdvanced(id: string, wait: number, cb: () => void) {
    if (this.timeoutHolder[id]) {
      clearTimeout(this.timeoutHolder[id]);
    }
    this.timeoutHolder[id] = setTimeout(() => {
      cb();
    }, wait);
  }

  isEmailValid(email: string) {
    if (!(email && typeof email === "string")) {
      return false;
    }
    // eslint-disable-next-line no-useless-escape
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidEmail(email: string) {
    if (!(email && typeof email === "string")) {
      return false;
    }
    const lastseg = (email.split("@")[1] || "").split(".")[1] || "";
    const input = document.createElement("input");
    input.type = "email";
    input.required = true;
    input.value = email;
    return !!(input.validity && input.validity.valid && lastseg.length);
  }

  isValidPhoneNumber(_str: string) {
    if (isNaN(Number(_str))) {
      return false;
    }
    const isNum = /^\d+$/.test(_str);
    return isNum;
  }

  removeDuplicateString(items: string[]) {
    if (!Array.isArray(items)) {
      return [];
    }
    return Array.from(new Set(items));
  }

  objectHasAnyProperty(obj: unknown): boolean {
    if (obj && typeof obj === "object") {
      return Object.keys(obj).length > 0;
    }
    return false;
  }

  replaceEmptySpaces(strValue: string, replacement: string) {
    return strValue
      .split(" ")
      .filter((x) => x !== "")
      .join(replacement);
  }

  getGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  waitUntilMilliseconds(ms: number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  pageWaitUntilMilliseconds(ms: number = 500) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }

  chunk<T>(arr: T[], size: number) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  }

  shuffleArray<T>(o: T[]) {
    for (
      let j: number, x: any, i = o.length;
      i;
      j = parseInt(`${Math.random() * i}`, 10), x = o[--i], o[i] = o[j], o[j] = x
    ) {
      //
    }
    return o;
  }
}

export const UtilService = new UtilServiceBase();
