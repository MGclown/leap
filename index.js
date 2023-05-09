import express from 'express';
import { config as _config } from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import axios from 'axios';

import Redis from 'ioredis';

_config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'))

import { exec } from "child_process";
import os from "os";
import { resolve } from 'path';
import { rejects } from 'assert';
const render_app_url = "https://leap.ydhhb.top";
const render_app_url1 = "https://mark.ydhhb.top/video/share/url/parse";



const BASE_URL = process.env.BASE_URL || 'https://api.tryleap.ai/api/v1';
const API_KEY = process.env.API_KEY || '16907a8b-1a2a-4af7-88ae-e8236828a806';
const modelId = process.env.modelId || '1e7737d7-545e-469f-857f-e4b46eaa151d';


// GET请求
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Leap api for render.',
    })
})
// 获取推荐关键词
app.get('/promptExample', async (req, res) => {
    // 此处填入功能列表
    let arr = [
        {id: 8, name: "卡通风格的猫咪", sta: true, prompt: "cat under a rock, dark, moody, concept art by alphonse mucha and greg rutkowski", negativePrompt: "asymmetric, watermarks"},
        {id: 3, name: "森林中的房子", sta: true, prompt: "futuristic tree house, hyper realistic, epic composition, cinematic, landscape vista photography by Carr Clifton & Galen Rowell, Landscape veduta photo by Dustin Lefevre & tdraw, detailed landscape painting by Ivan Shishkin, rendered in Enscape, Miyazaki, Nausicaa Ghibli, 4k detailed post processing, unreal engine", negativePrompt: ""},
        {id: 5, name: "未来派瀑布", sta: true, prompt: "futuristic waterfalls, pink and light blue water, hyper realistic, epic composition, cinematic, landscape vista photography by Carr Clifton & Galen Rowell, Landscape veduta photo by Dustin Lefevre & tdraw, detailed landscape painting by Ivan Shishkin, rendered in Enscape, Miyazaki, Nausicaa Ghibli, 4k detailed post processing, unreal engine", negativePrompt: ""},
        {id: 1, name: "宠物狗水彩画", sta: true, prompt: "a watercolor painting of @myDog a dog, watercolor,art station trends, unusually unique beauty, discord profile picture, imaginfx, stunning design, transparent labs, full body dramatic profile, dj, canvas art, lord of beasts, featured on artsation, very detailed design, concrete art style", negativePrompt: ""},
        {id: 4, name: "未来城市", sta: true, prompt: "futuristic nighttime cyberpunk New York City skyline landscape vista photography by Carr Clifton & Galen Rowell, 16K resolution, Landscape veduta photo by Dustin Lefevre & tdraw, 8k resolution, detailed landscape painting by Ivan Shishkin, DeviantArt, Flickr, rendered in Enscape, Miyazaki, Nausicaa Ghibli, Breath of The Wild, 4k detailed post processing, atmospheric, hyper realistic, 8k, epic composition, cinematic, artstation —ar 16:9", negativePrompt: ""},
        {id: 2, name: "带着皇冠的宠物狗", sta: true, prompt: "a painting of @myDog a dog wearing a crown, hearts of iron portrait style, pablo hurtado de mendoza, looks like jerma985, presidental elections candidates, ornate portrait, gigachad portrait, duke 3 d, rasta, ed", negativePrompt: ""},
        {id: 6, name: "人物证件照", sta: true, prompt: "8k linkedin professional profile photo of @me in a suit with studio lighting, bokeh, corporate portrait headshot photograph best corporate photography photo winner, meticulous detail, hyperrealistic, centered uncropped symmetrical beautiful", negativePrompt: "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature"},
        {id: 7, name: "人物头像", sta: true, prompt: "portrait of @me man in the garden, beautiful face, intricate, tone mapped, ambient lighting, clouds, green leafs foreground, parrots, highly detailed, digital painting, concept art, sharp focus, by makoto shinkai and akihiko yoshida and hidari and wlo", negativePrompt: "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature"},
	]
    // 筛选状态为开的功能返回
    let datas = [];
    arr.forEach(val=>{
        if(val.sta) datas.push(val);
    })
    res.status(200).send({
        data: datas,
        code: 200
    })
})

// 获取功能列表
app.get('/funList', async (req, res) => {
    const urls = `https://leap.ydhhb.top/files/`;
    // 此处填入功能列表
    let arr = [
        {id: 1, name: "去水印", url: "/pages/watermark/watermark",icon: 'watermark.svg', srcs: urls, sta: 1},
		{id: 2, name: "AI画图", url: "/pages/leap/leap",icon: 'AI.svg', srcs: urls, sta: 1},
		{id: 3, name: "Bot*?", url: "/pages/splash/splash",icon: 'logo1.png', srcs: urls, sta: 0},
		{id: 4, name: "画板", url: "/pages/canvastool/canvastool",icon: 'draw.svg', srcs: urls, sta: 1},
    ];
    // 筛选状态为开的功能返回
    let datas = [];
    arr.forEach(val=>{
        if(val.sta) datas.push(val);
    })
    res.status(200).send({
        cloud: false,
        data: datas,
        code: 200
    })
})



// 创建项目,返回api-key
app.get('/createProfile', async (req, res) => {
    const names = req.query.names || '';
    const config = {
        method: 'post',
        url: 'https://www.tryleap.ai/api/create-project',
        headers: {
           'Content-Type': 'application/json',
           'Accept': '*/*',
           'Connection': 'keep-alive'
        },
        data: JSON.stringify({
            "projectName": names,
            "userId": "390f8097-0e8f-4db7-8124-721595e5c936"
         })
     };
     
    axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        const datas = response.data.data.data;
        console.log('id',datas['update_workspace_by_pk'].id)
        retoken().then(k=>{
            getApiKey(datas['update_workspace_by_pk']['id'],k).then(thekey=>{
                console.log('----key',thekey)
                res.status(200).send({
                    data: thekey,
                    code: 200
                })
    
            }).catch(function (error) {
                console.log(error);
                res.status(500).send({err: error})
            });;
        }).catch(function (error) {
            console.log(error);
            res.status(500).send({err: error})
        });
    }).catch(function (error) {
        console.log(error);
        res.status(500).send({err: error})
    });
})


// 获取所有项目列表
app.get('/getProjects', async (req, res) => {
    const id = req.query.id || '';
    retoken().then(k=>{
        const config = {
            method: 'post',
            url: 'https://n.tryleap.ai/v1/graphql',
            headers: {
               'Content-Type': 'application/json',
               'Accept': '*/*',
               'Connection': 'keep-alive',
               'authorization': 'Bearer ' + k
            },
            data: JSON.stringify({
                "operationName": "GetAllProjects",
                "query": `query GetAllProjects {
                    workspace(where: {isArchived: {_eq: false}}) {
                      id
                      name
                      isArchived
                      createdAt
                      isPaid,
                      stripeCustomerId
                      stripeSubscriptionId
                      stripeSubscriptionItemIdImagesGenerated
                      stripeSubscriptionItemIdModelsTrained
                      __typename
                    }
                }`,
                "variables": {},
            })
         };
         
        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            const datas = response.data.data.workspace;
            res.status(200).send({
                data: datas,
                code: 200
            })
        }).catch(function (error) {
            console.log(error);
            res.status(500).send({err: error})
        });  
    }).catch(err=>{
        res.status(500).send({err})
    })
})


// 获取项目KEY
app.get('/getPkey', async (req, res) => {
    const id = req.query.id || '';
    retoken().then(k=>{
        const config = {
            method: 'post',
            url: 'https://n.tryleap.ai/v1/graphql',
            headers: {
               'Content-Type': 'application/json',
               'Accept': '*/*',
               'Connection': 'keep-alive',
               'authorization': 'Bearer ' + k
            },
            data: JSON.stringify({
                "operationName": "GetSystemApiKey",
                "query": `query GetSystemApiKey($workspaceId: uuid = "") {
                    api_key(
                      where: {_and: {workspaceId: {_eq: $workspaceId}, isSystemKey: {_eq: true}}}
                    ) {
                      id
                      isSystemKey
                      workspaceId
                      createdAt
                      __typename
                    }
                }`,
                "variables": {
                    "workspaceId": id
                },
            })
         };
         
        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            const datas = response.data;
            // const datas = response.data.data.api_key[0];
            res.status(200).send({
                data: datas,
                code: 200
            })
        }).catch(function (error) {
            console.log(error);
            res.status(500).send({err: error})
        });  
    }).catch(err=>{
        res.status(500).send({err})
    })
})



// 删除图像
app.get('/deleteLeap', async (req, res) => {
    const id = req.query.id || '';
    const url = `${BASE_URL}/images/models/${modelId}/inferences/${id}`;

    axios({
        url,
        method: 'delete',
        headers: {
            authorization: 'Bearer ' + API_KEY
        }
    }).then(response => {
        console.log(response)
        if(response.status == 200) {
            res.status(200).send({
                data: 'ok',
                code: 200
            })
        } else {
            res.status(500).send({
                err: "error"
            })
        }
    }).catch(err=>{
        res.status(500).send({err})
    })
})



// 获取单个图像
app.get('/getLeap', async (req, res) => {
    const id = req.query.id || '';
    const url = `${BASE_URL}/images/models/${modelId}/inferences/${id}`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + API_KEY
        }
    };
    if(!id) {
        res.status(500).send({err: "inferenceId 不能为空"});
    } else {
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.status(200).send({
                data: json,
            })
        })
        .catch(err => {
            console.error('error:' + err)
            res.status(500).send({err})
        });
    }
})



// 获取全部图像
app.get('/getAllLeap', async (req, res) => {
    const { page, pageSize } = req.query;
    const url = `${BASE_URL}/images/models/${modelId}/inferences?page=${page}&pageSize=${pageSize}`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + API_KEY
        }
    };
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.status(200).send({
                data: json,
            })
        })
        .catch(err => {
            console.error('error:' + err)
            res.status(500).send({err})
        });
})



// POST请求
app.post('/', async(req, res) => {
    try {
        const body = req.body;
        res.status(200).send({ body })
    } catch (error) {
        console.log(error);
        
    }
})



/* 
创建图像
@param{
    prompt: "用于推理的提示",
    negativePrompt: "用于推理的负面提示(排除的项)",
    version: "用于推理的模型版本。如果未提供，将默认为最新版本。",
    steps: "用于推理的步骤数",
    width: "用于推理的图像的宽度。必须是 8 的倍数, 默认512"，
    height: "用于推理的图像的高度。必须是 8 的倍数, 默认512",
    numberOfImages: "生成的图像数量",
    seed: "用于推理的种子。必须是正整数",
    restoreFaces: "（可选）对生成的图像应用人脸恢复。这将使面部图像看起来更逼真。",
    enhancePrompt: "（可选）自动增强提示以生成更好的结果",
    upscaleBy: "（可选）放大生成的图像。这将使图像看起来更逼真。默认值为 x1，表示不升级。最大值为 x4",
    promptStrength: "提示强度越高，生成的图像就越接近提示。必须介于 0 和 30 之间",
    sampler: "选择用于推理的采样器, 默认ddim"
}
*/
app.post('/createLeap', async(req, res) => {
    try {
        const {
            prompt,
            negativePrompt,
            steps,
            width,
            height,
            numberOfImages,
            upscaleBy,
            restoreFaces,
            promptStrength,
            enhancePrompt,
        } = req.body;
        const tkey = req.body.apiKey || API_KEY;
        const sampler = req.body.sampler || 'ddim';
        const url = `${BASE_URL}/images/models/${modelId}/inferences`;
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer ' + tkey
            },
            body: JSON.stringify({
                prompt,
                negativePrompt: negativePrompt ? negativePrompt : 'asymmetric, watermarks',
                steps,
                width,
                height,
                numberOfImages,
                promptStrength,
                restoreFaces,
                enhancePrompt,
                upscaleBy: upscaleBy ? 'x'+upscaleBy : 'x1',
                sampler: sampler
            })
        };
        if(!prompt) {
            res.status(500).send({err: "prompt 不能为空"});
        } else {
            fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                res.status(200).send({
                    data: json,
                })
            })
            .catch(err => {
                console.error('error:' + err)
                res.status(500).send({err})
            });
        }
    } catch (error) {
        res.status(500).send({err: error})
    }
})



// 刷新token
function retoken() {
    return new Promise((resolve, rejects)=>{
        const config = {
            method: 'post',
            url: 'https://n.tryleap.ai/v1/auth/token',
            headers: {
               'Content-Type': 'application/json',
               'Accept': '*/*',
               'Connection': 'keep-alive',
            },
            data: JSON.stringify({
                'refreshToken': '1b1869fa-4787-4745-ac06-29eda63c225d'
            })
        };
        axios(config).then(function (response) {
            // console.log('!!success',response.data)
            const datas = response.data.accessToken;
            resolve(datas);
        }).catch(function (error) {
            console.log(error)
            rejects(error);
        });
    })
}
// 获取key
function getApiKey (id, key) {
    // console.log('接收',id)
    return new Promise((resolve, rejects)=>{
        const config = {
            method: 'post',
            url: 'https://n.tryleap.ai/v1/graphql',
            headers: {
               'Content-Type': 'application/json',
               'Accept': '*/*',
               'Connection': 'keep-alive',
               'authorization': 'Bearer ' + key
            },
            data: JSON.stringify({
                "operationName": "GetSystemApiKey",
                "query": "query GetSystemApiKey($workspaceId: uuid = \"\") {\n  api_key(\n    where: {_and: {workspaceId: {_eq: $workspaceId}, isSystemKey: {_eq: true}}}\n  ) {\n    id\n    isSystemKey\n    workspaceId\n    createdAt\n    __typename\n  }\n}\n",
                "variables": {
                    "workspaceId": id
                },
            })
        };
        axios(config).then(function (response) {
            console.log('!!success',response.data)
            const datas = response.data.data.api_key[0];
            resolve(datas['id']);
        }).catch(function (error) {
            console.log(error)
            rejects(error);
        });
    })
}



/* keepalive  begin */
function keepalive() {
    // 1.请求主页，保持唤醒
    axios({
        url: render_app_url,
        method: 'get'
    }).then(response => {
        console.log("API响应报文：",response.data);
    }).catch(err=>{
        console.log("API请求错误: " + err);
    })
    // 1.请求去水印服务
    axios({
        url: render_app_url1,
        method: 'get'
    }).then(response => {
        console.log("去水印响应报文：",response.data);
    }).catch(err=>{
        console.log("去水印请求错误: " + err);
    })
  
    //2. 本地进程检测,保活
    exec("ps -ef", function (err, stdout, stderr) {
      if (err) {
        console.log("保活本地进程检测-命令行执行失败:" + err);
      } else {
        console.log("保活本地进程检测正在运行 stdout", stdout);
        if (stdout.includes("node index.js"))
            console.log("保活index.js-本地进程检测-index.js正在运行");
        //命令调起web.js
        else startWeb();
      }
    });
  }
  
  //保活频率设置为58秒
  setInterval(keepalive, 58 * 1000);


  /* keepalive  end */
  function startWeb() {
    let startWebCMD = "chmod +x ./index.js && ./index.js >/dev/null 2>&1 &";
    // let startWebCMD = "node index.js";
    exec(startWebCMD, function (err, stdout, stderr) {
      if (err) {
        console.log("启动index.js-失败:" + err);
      } else {
        console.log("启动index.js-成功!");
      }
    });
  }

const port = process.env.PORT || 3000
const host = process.env.HOST || ''

app.server = app.listen(port, host, () => {
  console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
export default app;