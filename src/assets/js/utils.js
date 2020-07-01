//把文件按照二进制进行读取
export function readFile(file){
  return new Promise((res)=>{
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e =>{
      res(e.target.result)
    }
  })
}
//设置一步间隔延迟
export function delay(insterval = 0){
  return new Promise((res)=>{
      let timer = setTimeout(()=>{
        clearTimeout(timer)
        res()
      },insterval)
    })
}
//字段对应表
export let character = {
  timer:{
    text:"客服处理时间",
    type:"string"
  },
  relatePartnerName:{
    text:"公司名称",
    type:"string"
  },
  wareName:{
    text:"礼品名称",
    type:"string"
  },
  mobilePhoneNo:{
    text:"受理号码",
    type:"string"
  },
  acceptDate:{
    text:"投诉时间",
    type:"string"
  },
  oldOrderId:{
    text:"订单号",
    type:"string"
  },
  oldSuborderId:{
    text:"子订单号",
    type:"string"
  },
  money:{
    text:"订单金额",
    type:"string"
  },
  integral:{
    text:"积分值",
    type:"string"
  },
  result:{
    text:"处理结果",
    type:"string"
  },
  Refund:{
    text:"退费金额",
    type:"string"
  },
  overtime:{
    text:"是否超时",
    type:"string"
  }
}