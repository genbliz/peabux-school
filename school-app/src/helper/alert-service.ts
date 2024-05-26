import Swal, { SweetAlertOptions } from "sweetalert2";

type IAlertOptions = string | { title: string; text?: string; disableDismiss?: boolean };

class AlertModalServiceBase {
  private isOpen = false;
  private waitingAllert: Partial<SweetAlertOptions>[] = [];

  private async runAlertBase(opt: Partial<SweetAlertOptions>) {
    try {
      this.isOpen = true;
      await Swal.fire(opt as SweetAlertOptions);
      await this.waitUntillSeconds(0.6);
      this.isOpen = false;
      this.runAwaiting();
    } catch (err) {
      this.isOpen = false;
      await this.waitUntillSeconds(0.6);
      this.runAwaiting();
    }
  }

  private waitUntillSeconds(waitInSeconds: number) {
    let wait = Math.round(waitInSeconds * 1000);
    wait = wait > 100 ? wait : 100;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, wait);
    });
  }

  private alertBase(opt: Partial<SweetAlertOptions>) {
    if (this.isOpen) {
      this.waitingAllert.push(opt);
      return;
    }
    this.runAlertBase(opt).catch((e) => console.log(e));
  }

  private getOptions({ opt, icon }: { opt: IAlertOptions; icon: "warning" | "error" | "info" | "success" }) {
    if (typeof opt !== "string") {
      const { title, text, disableDismiss } = opt;
      const option01: Partial<SweetAlertOptions> = {
        title,
        text,
        icon: icon,
        allowOutsideClick: disableDismiss === true,
      };
      return option01;
    }
    const option01: Partial<SweetAlertOptions> = {
      title: opt,
      icon: icon,
      allowOutsideClick: false,
    };
    return option01;
  }

  warning(opt: IAlertOptions) {
    this.alertBase(this.getOptions({ opt, icon: "warning" }));
  }

  error(opt: IAlertOptions) {
    this.alertBase(this.getOptions({ opt, icon: "error" }));
  }

  info(opt: IAlertOptions) {
    this.alertBase(this.getOptions({ opt, icon: "info" }));
  }

  success(opt: IAlertOptions) {
    this.alertBase(this.getOptions({ opt, icon: "success" }));
  }

  alertContent({
    title,
    contentHtml,
    disableDismiss,
  }: {
    title: string;
    contentHtml: string | HTMLDivElement;
    disableDismiss?: boolean;
  }) {
    const node = this.parseHtmlStringToNode(contentHtml);
    const option01: Partial<SweetAlertOptions> = {
      title,
      html: node,
      icon: "warning",
      allowOutsideClick: disableDismiss === true,
    };
    this.alertBase(option01);
  }

  private runAwaiting() {
    setTimeout(() => {
      if (this.waitingAllert && this.waitingAllert.length) {
        const opt = this.waitingAllert.splice(0, 1);
        this.runAlertBase(opt[0]).catch((e) => console.log(e));
      }
    }, 400);
  }

  private parseHtmlStringToNode(htmlDiveOrString: string | HTMLDivElement): HTMLDivElement {
    if (typeof htmlDiveOrString === "string") {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = htmlDiveOrString;
      return wrapper;
    }
    return htmlDiveOrString;
  }
}

export const AlertModalService = new AlertModalServiceBase();
