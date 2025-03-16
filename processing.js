export class Processing{
  time_start     = 0
  time_end       = 0
  time_range     = 0
  id             = "mynt_processing"
  progress_class = "progress"
  bar_class      = "bar"

  constructor(options){
    if(!options && this.root){return}
    this.options = options
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.set_css()
    })
  }

  get root(){
    return document.getElementById(this.id)
  }

  get progress(){
    return this.root.querySelector(`.${this.progress_class}`)
  }

  get bar(){
    return this.progress.querySelector(`.${this.bar_class}`)
  }

  get intermediate_time(){
    return ((+new Date()) - this.time_start) / 1000
  }


  set_css(){
    if(document.querySelector(`link.${this.id}`)){
      this.finish()
    }
    else{
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.className = this.id
      const js_url = import.meta.url
      const path = js_url.split('/').slice(0,-1).join('/')
      const name = js_url.split('/').slice(-1).join("").split(".").slice(0,-1)
      link.href = `${path}/${name}.css`
      link.onload = this.finish.bind(this)
      document.head.appendChild(link)
    }
    
  }

  start(){
    this.set_root()
    this.set_progress()
    this.set_bar()
    this.set_rate(this.options.rate || 0)
  }

  set_root(){
    const root = document.createElement("div")
    root.id = this.id
    root.setAttribute("data-message",this.options.message || "processing")
    document.body.appendChild(root)
  }

  set_progress(){
    if(!this.root){return}
    const div = document.createElement('div')
    div.className = this.progress_class
    div.innerHTML = this.options.message || "processing"
    if(this.options.style){
      div.setAttribute("style" , this.options.style, "")
    }
    this.root.appendChild(div)
  }

  set_bar(){
    if(!this.progress){return}
    const div = document.createElement('div')
    div.className = this.bar_class
    this.progress.appendChild(div)
  }

  update(rate){
    this.set_rate(rate)
  }

  set_rate(rate){
    if(!this.progress || !this.bar){return}
    rate = Number(rate || 0)
    rate = rate <= 100 ? rate : 100
    this.bar.style.setProperty('--w' , `${rate}%` , '')
    this.get_process_time()
  }

  // set_status(status){
  //   if(!this.root){return}
  //   this.root.setAttribute('data-status' , status || 'passive')
    
  //   this.calc_time(status)
  // }
  
  // calc_time(status){
  //   switch(status){
  //     case "active":
  //       this.time_start = (+new Date())
  //       break
  //     case "passive":
  //       this.time_end = (+new Date())
  //       this.set_rate(0)
  //       break
  //   }
  //   if(this.time_start && this.time_end){
  //     this.time_range = (this.time_end - this.time_start )/ 1000
  //   }
  // }


  get_process_time(){
    const current_date = (+new Date())
    this.time = current_date - this.time_start / 1000
  }


  clear(){
    const root = this.root
    if(!root){return}
    root.parentNode.removeChild(root)
  }

  end(callback){
    this.set_rate(100)
    setTimeout((()=>{
      this.clear()
      if(callback){
        callback()
      }
    }), 1000)
  }


  finish(){
    this.resolve()
  }
}