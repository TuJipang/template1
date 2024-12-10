import axios from 'axios';
import { Toast } from 'vant';
import { Local } from '@/utils/storage';
import qs from 'qs';
export default {
	path: window.location.protocol + '//' + window.location.host,
	imgUrl:import.meta.env.VUE_APP_FILE_PREFIX, //图片地址前缀
	alert,
	post,
	postJson,
	getjson,
	logoutAction,
	get,
	getFtpUrl,
	all,
	upload,
	down,
	page,
	postAction,
	getAction,
	postJsonAction,
	getJsonAction,
	uploadAction,
	getpath,
	hasPermission,
	pagepost,
	debouce,
};
var uuid = getUUID();
var timestamp = new Date().getTime();

// const SM3 = require('sm-crypto').sm3;

// 添加请求拦截器
axios.interceptors.request.use(
	function (config: any) {
		// 请求头
		config.headers.random = uuid;
		config.headers.timestamp = timestamp;

		// 在发送请求之前做些什么
		// let token = sessionStorage.getItem('Authorization')
		var token = sessionStorage.getItem('token');
		//     console.log(token)
		if (!config.headers.hasOwnProperty('token') && token) {
			config.headers.token = token;
			var signInfo = 'token=' + token + '&timestamp=' + timestamp + '&random=' + uuid + '&secretkey=982a91c32a3a4aabbf3e5759014ad1e1';
			// console.log(signInfo)
			// config.headers.sign = SM3(signInfo).toUpperCase();
		}
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		// router.push({ path: '/404' });
		return Promise.reject(error);
	}
);
// // 响应拦截器
// axios.interceptors.response.use(
// 	function (response: any) {
// 		//  console.log(response)
// 		if (response.data.resultCode == '200001' || response.data.resultCode == '1004') {
// 			// sessionStorage.removeItem("userName")
// 			// console.log('cccccccssssssssss')
// 			// router.push({ path: '/404' });
// 			// next({
// 			//   path: '/login',
// 			//   // query: { redirect: to.fullPath }
// 			// })
// 		} else if (response.data.errors) {
// 			if (response.data.errors.errorcode == '200001' || response.data.errors.errmsg == '用户登录已超时！') {
// 				// router.push({ path: '/404' });
// 				// store.commit('SET_isRouterAlive',false)
// 				// setTimeout(() => {
// 				//     store.commit('SET_isRouterAlive',true)
// 				//     alerterror(response.data.errors.errmsg)
// 				// }, 100);
// 				// store.commit("SET_loginType", 0);
// 				// setTimeout(() => {
// 				//     store.commit("SET_loginShow", 1);
// 				// }, 1000);
// 			} else {
// 				return response;
// 			}
// 		} else {
// 			return response;
// 		}
// 	},
// 	function (error) {
// 		// 后续增加全局处理，增加弹出窗等
// 		return Promise.reject(error);
// 	}
// );

// 获取请求随机串
function getUUID() {
	var s = [];
	var hexDigits = '0123456789abcdef';
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = '4';
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = '-';
	var uuid = s.join('');
	return uuid;
}

/**
 * get请求
 * @param url
 * @param data
 * @param cb
 * @returns
 */
function get(url: any, data: any, cb: any, completFn: any) {
	//参数处理，删除其中的空数据
	if (data) {
		for (var key in data) {
			if (data[key] == null) {
				delete data[key];
			}
		}
	}
	var p = axios.get(url, {
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			// Authorization: sessionStorage.getItem('token'),
		},
		params: data,
		paramsSerializer: (params) => {
			return qs.stringify(params, { indices: false });
		},
	});
	p.then(function (result) {
		proRes(result, cb);
	}).then(function (response) {
		typeof completFn == 'function' && completFn(response);
	});
	return p;
}

function debouce(func: any, delay = 100) {
	let timer = null;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			func.call(this, ...args);
		}, delay);
	};
}

function getjson(url: any, data: any, cb: any, completFn: any) {
	//参数处理，删除其中的空数据
	if (data) {
		for (var key in data) {
			if (data[key] == null) {
				delete data[key];
			}
		}
	}
	var p = axios.get(url, {
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
		params: data,
		paramsSerializer: (params) => {
			return qs.stringify(params, { indices: false });
		},
	});
	p.then(function (result) {
		proRes(result, cb);
	}).then(function (response) {
		typeof completFn == 'function' && completFn(response);
	});
	return p;
}

// post请求
function post(url: any, data: any, cb: any) {
	var p = axios.post(url, qs.stringify(data, { arrayFormat: 'repeat', allowDots: true }), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
		},
	});
	p.then(function (response) {
		proRes(response, cb);
	})
		.catch(function (error) {
			console.log(error);
		})
		.then(function (response) {
			// typeof completFn == 'function' && completFn(response);
		});

	return p;
}
/**
 all([pcs.post("/api/one",{str:"参数"},function (res) {
        console.debug(dd)
      }), pcs.get("/api/two",{str:"参数"},function (res) {

      })],function (oneRes, twoRes) {
        console.debug(oneRes)
        console.debug(twoRes)
      })
 */
function all(iterable: any, fn: any) {
	axios.all(iterable).then(
		axios.spread(function (...args) {
			var nargs = [] as any;
			args.forEach((item: any) => {
				nargs.push(item.data);
			});
			fn(...nargs);
		})
	);
}

/**
 * 文件上传
 * @param url
 * @param data
 * @param cb
 * @param completFn
 * @return
 */
function upload(url: any, data: any, cb: any, completFn: any) {
	var p = axios.post(url, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	p.then(function (response) {
		proRes(response, cb);
	})
		.catch(function (error) {
			//console.log(error)
		})
		.then(function (response) {
			typeof completFn == 'function' && completFn(response);
		});
	return p;
}

/**
 * 文件上传
 */
function uploadAction(mapping: any, param: any, fn: any, completFn: any) {
	return upload(
		mapping,
		param,
		function (data: any) {
			if (data.success) {
				fn(data.rs);
			} else {
				alerterror(data.errors.errmsg);
			}
		},
		completFn
	);
}

/**
 * 文件下载
 * @param filePath
 * @param fileName，可为空
 */
function down(filePath: any, fileName: any) {
	var url = '/api/down?filePath=' + filePath;
	if (fileName != null) {
		url += '&fileName=' + fileName;
	}
	window.open(url);
}

/**
 * post json请求
 * @param url
 * @param data
 * @param cb
 * @param completFn
 */
function postJson(url: any, data: any, cb: any, completFn: any) {
	var p = axios.post(url, data);
	p.then(function (response) {
		proRes(response, cb);
	})
		.catch(function (error) {
			//console.log(error)
		})
		.then(function (response) {
			typeof completFn == 'function' && completFn(response);
		});
	return p;
}

//分页默认配置
function _pageSetting({
	queryConKey = 'queryCon', //查询条件的关键字，从pager中读取
	pageSize = 15, //分页大小
	current = 1, //默认当前页
	isEncode = true, //是否编码
	dataKey, //页面展示是数据key，必要参数
	pageContext, //页面对象，必要参数
	dataProcess, //数据处理
	toNextFlag = false,
	pagerName = 'pager', //页脚对象
	completFn, //完成后调用
}) {
	return {
		queryConKey: queryConKey,
		pageSize: pageSize,
		current: current,
		isEncode: isEncode,
		dataKey: dataKey,
		pageContext: pageContext,
		dataProcess: dataProcess,
		toNextFlag: toNextFlag,
		pagerName: pagerName,
		completFn: completFn,
	};
}

/**
 * 分页请求
 *  pcs.page('/api/page' , {
        dataKey: 'list',
        pageContext: this,
        pageSize: 10,
        dataProcess:function(list){
          list.forEach(item => {
            console.debug(item.ID);
          })
        },
        completFn:function (data) {
        }
      })
 * @param url
 * @param param 可以参考_pageSetting中的说明
 */
function page(url: any, param: any) {
	var pageContext = param.pageContext;
	//处理默认值
	param = _pageSetting(param);
	// pageContext.loading = true;
	//设置组件（页面）内的分页对象
	if (!pageContext[param.pagerName]) {
		pageContext[param.pagerName] = {};
	}
	var pager = pageContext[param.pagerName];

	//设置页脚信息
	if (pager.pageSize == null) pager.pageSize = param.pageSize;
	if (pager.current == null) pager.current = param.current;
	if (!pager.toNextFlag) {
		pager.current = 1;
	} else {
		pager.toNextFlag = false;
	}
	//查询条件处理
	var queryCon = pager.queryCon;
	var queryStr = '';
	if (queryCon) {
		for (var key in queryCon) {
			if (queryCon[key] != null) {
				queryStr += '&' + key + '=' + queryCon[key];
			}
		}
		if (url.indexOf('?') > -1) {
			url += queryStr;
		} else {
			url += '?' + queryStr;
		}
	}
	//编码
	if (param.isEncode) {
		url = encodeURI(url);
	}
}

function pagepost(url: any, param: any) {
	var pageContext = param.pageContext;
	//处理默认值
	param = _pageSetting(param);
	// pageContext.loading = true;
	//设置组件（页面）内的分页对象
	if (!pageContext[param.pagerName]) {
		pageContext[param.pagerName] = {};
	}
	var pager = pageContext[param.pagerName];

	//设置页脚信息
	if (pager.pageSize == null) pager.pageSize = param.pageSize;
	if (pager.current == null) pager.current = param.current;
	if (!pager.toNextFlag) {
		pager.current = 1;
	} else {
		pager.toNextFlag = false;
	}
	//查询条件处理
	var queryCon = pager.queryCon;
	var queryStr = '';
	if (queryCon) {
		for (var key in queryCon) {
			if (queryCon[key]) {
				queryStr += '&' + key + '=' + queryCon[key];
			}
		}
		if (url.indexOf('?') > -1) {
			url += queryStr;
		} else {
			url += '?' + queryStr;
		}
	}
	//编码
	if (param.isEncode) {
		url = encodeURI(url);
	}
}

/**
 *  页面data区域 配置类似以下参数，然后传入，请求结果会更新show字段
 *    permissions:{
          edit:{
            cfg:'sys:pcakage:edit',
            show:false
          },
          del:{
            cfg:'sys:pcakage:del',
            show:false
          }
        },
 * @param {} permissionNames
 * @param {} fn 可以不传
 */
function hasPermission(permissions: any, fn: any) {
	var funs = [];
	for (let k in permissions) {
		funs.push(k + '#' + permissions[k].cfg);
	}
	getAction(
		'/api/checkPermission',
		{ permissions: funs },
		(rs) => {
			for (let k in rs) {
				permissions[k].show = rs[k];
			}
		},
		fn
	);
}

function proRes(res: any, cb: any) {
	if (res.status == 200 || res.status == 304) {
		return typeof cb == 'function' && cb(res.data);
	} else {
		alerterror('请求错误，错误码：' + res.status);
	}
}

/**
 * 发送POST请求Action
 */
function postAction(mapping: any, param: any, fn: any, completFn: any) {
	return post(
		mapping,
		param,
		function (data: any) {
			//  fn(data)
			if (data.ds) {
				fn(data);
			} else {
				alerterror(data.resultDesc);
			}
		},
		completFn
	);
}

/**
 * 发送POST请求Action，提交数据以json格式
 */
function postJsonAction(mapping: any, param: any, fn: any, completFn: any) {
	return postJson(
		mapping,
		param,
		function (data) {
			if (data.success) {
				fn(data);
			} else {
				alerterror(data.errors.errmsg);
			}
		},
		completFn
	);
}
/**
 * 发送POST请求Action，提交数据以json格式
 */
function getJsonAction(mapping: any, param: any, fn: any, completFn: any) {
	return getjson(
		mapping,
		param,
		function (data) {
			if (data.ds) {
				fn(data);
			} else {
				alerterror(data);
			}
		},
		completFn
	);
}
/**
 * 发送get请求Action
 */
function getAction(mapping: any, param: any, fn: any) {
	return get(mapping, param, function (data) {
		if (data.rs) {
			fn(data);
		} else {
			alerterror(data.errors.errmsg);
		}
		//fn(data)
	});
}

function getFtpUrl(mapping: any, param: any, fn: any, completFn: any) {
	return get(
		mapping,
		param,
		function (data: any) {
			if (data.success) {
				fn(data.rs);
			} else {
			}
		},
		completFn
	);
}

function logoutAction(mapping: any, param: any, fn: any, completFn: any) {
	return get(
		mapping,
		param,
		function (data: any) {
			fn(data);
		},
		completFn
	);
}
function getpath(url: any) {
	if (url != null && url != '') {
		return 'http://47.106.96.101:8098/hydropower_img/' + url;
	} else {
		return '';
	}
}

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	responseType: 'json',
	timeout: 1000 * 60 * 3,
	headers: {
		'Content-Type': 'application/json',
		Token: Local.get('token'),
	},
	// cancelToken: new axios.CancelToken(function (cancel) {
	// 	console.log('55555555555 :>> ', 55555555555);
	// }),
	// showLoading: false, // 展示加载动画
	// loadingText: '加载中...', // 展示加载动画
	// showErrorMessage: true, // 展示错误信息
});

// 统一处理取消重复请求
// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const requestList: any = [];

function cancelRequest(config: any) {
	for (const r in requestList) {
		// 当当前请求在数组中存在时执行函数体
		if (requestList[r].u === `${config.url}&${config.method}&${JSON.stringify(config.data)}`) {
			// 执行取消操作
			requestList[r].f();
			// 把这条记录从数组中移除
			requestList.splice(r, 1);
		}
	}
}
// 添加请求拦截器
service.interceptors.request.use(
	(config: any) => {
		console.log('config:', config);
		const source = axios.CancelToken.source();
		if (config.url === '/hluser/login') {
			config.data = JSON.stringify({
				...config.data,
			});
		} else if (config.method === 'post' || config.method === 'put') {
			config.data = JSON.stringify({
				...config.data,
				unionid: Local.get('unionid'),
				// cancelToken: source.token,
			});
		} else if (config.method === 'get' || config.method === 'delete') {
			config.params = {
				...config.params,
				unionid: Local.get('unionid'),
				// cancelToken: source.token,
			};
		}
		//请求去除前后空格
		//  Object.keys(config.data).forEach(function(key){
		//       config.data[key] = config.data[key].trim()
		//    });
		// 在一个ajax发送前执行一下取消操作
		cancelRequest(config);
		config.cancelToken = new axios.CancelToken((c) => {
			// 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
			requestList.push({
				u: config.url + '&' + config.method,
				f: c,
			});
		});
		config.__data__ = config.data;

		if (Local.get('token')) {
			// config.headers.common['Authorization'] = `${Local.get('token')}`;
			config.headers.Token = Local.get('token');
			// config.headers.user_id = Local.get('user_id');
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);
// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		const { data: res, config } = response;
		// 在一个ajax响应后再执行一下取消操作，把已经完成的请求从requestList中移除
		cancelRequest(config);
		switch (res.code) {
			case '0000':
				// 成功状态
				return Promise.resolve(response.data);
			case '11012':
				// Token` 过期或者账号已在别处登录
				Toast.fail(`${res.msg}`);
				Local.clear();
				setTimeout(() => {
					// window.location.href = '/'; // 去登录页
					window.location.replace('/'); // 去登录页
				}, 800);
				return Promise.reject(res);
			case '11026':
				Toast.fail(`${res.msg}`);
				Local.clear();
				setTimeout(() => {
					// window.location.href = '/'; // 去登录页
					window.location.replace('/'); // 去登录页
				}, 800);
				return Promise.reject(res);
			// return Promise.reject(service.interceptors.response)
			default:
				// 其他异常错误
				// ToastBox.alert(`${res.msg}`, {}).then(() => {});
				Toast.fail(`${res.msg}`);
				return Promise.reject(res);
			// return Promise.reject(res);
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			Toast.fail('网络超时');
		} else if (error.message == 'Network Error') {
			Toast.fail('网络连接错误');
		} else {
			if (error.response.data) Toast.fail(error.response.statusText);
			else Toast.fail('接口路径找不到');
		}
		return Promise.reject(error);
	}
);
