// API 请求封装 - Nano Banana Pro
const API_BASE_URL = 'https://api.kie.ai/api/v1';

// 创建生成任务
async function createTask(apiKey, prompt, options = {}) {
  const {
    aspectRatio = '1:1',
    resolution = '1K',
    outputFormat = 'png',
    imageInput = []
  } = options;

  const response = await fetch(`${API_BASE_URL}/jobs/createTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt,
        image_input: imageInput,
        aspect_ratio: aspectRatio,
        resolution,
        output_format: outputFormat
      }
    })
  });

  const data = await response.json();

  if (data.code !== 200) {
    throw new Error(data.msg || '创建任务失败');
  }

  return data.data.taskId;
}

// 查询任务状态
async function queryTaskStatus(apiKey, taskId) {
  const response = await fetch(`${API_BASE_URL}/jobs/recordInfo?taskId=${taskId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const data = await response.json();

  if (data.code !== 200) {
    throw new Error(data.msg || '查询任务失败');
  }

  return data.data;
}

// 轮询等待任务完成
async function waitForTaskComplete(apiKey, taskId, onProgress, interval = 2000, maxAttempts = 60) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await queryTaskStatus(apiKey, taskId);

    if (onProgress) {
      onProgress(result.state);
    }

    if (result.state === 'success') {
      // 解析结果 JSON
      const resultData = JSON.parse(result.resultJson);
      return {
        success: true,
        urls: resultData.resultUrls,
        costTime: result.costTime
      };
    }

    if (result.state === 'fail') {
      return {
        success: false,
        failCode: result.failCode,
        failMsg: result.failMsg
      };
    }

    // 等待后继续轮询
    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  return {
    success: false,
    failMsg: '任务超时'
  };
}

// 生成图片（创建任务 + 轮询结果）
async function generateImage(apiKey, prompt, options = {}, onProgress) {
  // 创建任务
  const taskId = await createTask(apiKey, prompt, options);

  // 轮询等待完成
  return await waitForTaskComplete(apiKey, taskId, onProgress);
}
