//验证码对象
const VCode= {
	chars: "1",//验证码中出现的字符
	Vlen: 5, //验证码长度
		
	//产生验证码
	createVCode(len) {
		let vcode= "";
		
		//从Chars中随机找到len个字符，串起来
		for(let i= 1; i <= len; i++){			
			vcode+= this.chars[ Math.floor(Math.random() * this.chars.length) ]; 
		}
		
		return vcode;		
	},//createVCode	
	
	showVCode(){
		document.querySelector("#vcodeImg").innerHTML= this.createVCode(this.Vlen);
	}
};//VCode


//验证对象
const Verifying= {	
	// 为input的父容器添加error类
	showError(input, message) {
		const formGroup = input.parentElement;
		
		formGroup.classList.remove("success");
		formGroup.classList.add("error");	
	
		//在input父容器中的tips中显示错误信息
		formGroup.querySelector('.tips').innerText = message;
	},//showError
	
	// 验证通过, 移除错误信息
	//// input的父容器移除error类 
	showSuccess(input) {  
		const formGroup = input.parentElement;
		
		formGroup.classList.remove("error");
		formGroup.classList.add("success");
	},
	
	//必填数据验证
	//参数是数组，可以同时判断一批控件输入
	checkRequired(inputArr) {
		let result= true;
		
		for(let input of inputArr){
			if (input.value.trim() === '') {
				this.showError(input, "该项不能为空!");
				result= false;
			} else {
				this.showSuccess(input);
			}
		}//for		
	
		return result;
	},//checkRequired
	
	
	//验证账号
	//规则：必须是11位数字。
	verifyUserName(){
		const input= document.querySelector("#userName");	
		const user= input.value.trim(); //账号		
			
		if( user.length !== 11 ){//不是11位数字			
			this.showError(input, "非法的手机号码!");
			return false;	
		} else {		
			this.showSuccess(input);		
			return true;		
		}	
	},//verifyUserName
	
	
	//验证密码
	//规则：密码长度 > 6。
	verifyPwd(){
		const input= document.querySelector("#pwd");
		const len= input.value.trim().length; //密码字符串长度	
			
		if(len < 6){		
			this.showError(input, "密码长度不能少于6位!");		
			return false;
		} else {		
			this.showSuccess(input);		
			return true;	
		}	
	},//verifyPwd
	
	
	//验证确认密码
	//规则：密码与确认密码相同。
	verifyConfirmPwd(){
		const input= document.querySelector("#pwdConfirm");
		const pwd1= document.querySelector("#pwd").value.trim(); //密码
		const pwd2= input.value.trim(); //确认密码
			
		if(pwd1 !== pwd2){		
			this.showError(input, "确认密码与密码不一致!");		
			return false;
		} else {		
			this.showSuccess(input);		
			return true;	
		}	
	},//verifyConfirmPwd
	
	
	//验证验证码
	//规则：输入的验证码与生成的相同。不考虑大小写。
	verifyVCode(){
		const input= document.querySelector("#vcodeText"); //输入内容
		const code= document.querySelector("#vcodeImg").innerHTML.toLowerCase(); //当前验证码
		const codeInput= document.querySelector("#vcodeText").value.trim().toLowerCase(); //输入内容
		
		if(code !== codeInput){		
			this.showError(input, "验证码错误!");	
			return false;
		} else {		
			this.showSuccess(input);
			return true;	
		}
	},//verifyVCode
	
	
	//验证用户协议
	//规则：必须勾选。
	verifyAgree(){	
		const input= document.querySelector("#checkAgree"); //输入内容
		let agree= input.checked; //获取checkbox的值
		
		if(!agree){		
			this.showError(input, "请勾选同意协议!");					
			return false;
		} else {		
			this.showSuccess(input);				
			return true;	
		}
	},//verifyAgree
	
	checkAll(){
		//验证账号
		if( !this.verifyUserName() ){
			document.querySelector("#userName").focus();
			return false;;
		}
		
		//验证密码
		if( !this.verifyPwd() ){
			document.querySelector("#pwd").focus();
			return false;;
		}
		
		//验证确认密码
		if( !this.verifyConfirmPwd() ) {
			document.querySelector("#pwdConfirm").focus();
			return false;;
		}
		
		//验证验证码
		if( !this.verifyVCode() ){
			document.querySelector("#vcodeText").focus();
			return false;;
		}
		
		//验证勾选用户协议
		if( !this.verifyAgree() ) return;
		
		//不能空, 仅演示用, 这里不会执行				
		let  arrRequired= [];//传递数组, 统一验证
		arrRequired.push( document.querySelector("#userName") );
		arrRequired.push( document.querySelector("#pwd") ); 
		if( !this.checkRequired(arrRequired) ){		
			return false;
		}
		
		return true;
	},//checkAll
	
};//Verifying


//页面加载时显示验证码
window.onload= () => VCode.showVCode()

//切换验证码
document.querySelector("#vcodeImg").onclick= () => VCode.showVCode()


// 鼠标点击到单元，input获得焦点
//利用事件委托，统一处理，节省资源
document.querySelector("form").onclick= (e) => {	
	if( e.target.classList.contains("form-group") ){//存在form-group类的div
		e.target.querySelector('input').focus();//寻找内部的文本框, 获取焦点		
	}		
}//onmouseover


//键入账号时检验
//禁止输入非数字
document.querySelector("#userName").onkeypress= (e) => {
	if("" === e.key || isNaN(e.key) )e.preventDefault();
	Verifying.verifyUserName();
}

//键入密码时检验
document.querySelector("#pwd").oninput= () => Verifying.verifyPwd()

//键入确认密码时检验
document.querySelector("#pwdConfirm").oninput= () => Verifying.verifyConfirmPwd()

//同意协议
document.querySelector("#checkAgree").onclick= () => {
	Verifying.verifyAgree()
}

//点击“注册”，验证输入数据。
document.querySelector("#btnReg").onclick= () => {	
	if(!Verifying.checkAll())return;	
	
	alert('注册成功！'); //通过上面所有验证
}//onclick