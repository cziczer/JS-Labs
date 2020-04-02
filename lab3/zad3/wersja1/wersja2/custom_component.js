class CustomComponent extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.number = document.getElementById("number");
      }

      get count(){
          return this.getAttribute("count");
      }

      set count(val){
          this.setAttribute("count", val)
      }

      static get observedAttributes(){
          return ["count"]
      }

      attributeChangedCallback(prop, oldVal, newVal){
        if(prop == 'count')
        this.render();
      }

      connectedCallback(){
        this.count = this.number.value;
        
        setInterval(() => {
            if(this.count > 0)
                this.count--;

            this.render();
            if(this.count == 0)
                this.number.value = 0
        }, 1000);

        this.number.addEventListener("input", e => {
            this.count = number.value;
        });

          this.render();
      }

      render(){
          this.shadow.innerHTML = `
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          <span> ${this.count} </span>
          `;
      }
}

customElements.define("custom-counter", CustomComponent);