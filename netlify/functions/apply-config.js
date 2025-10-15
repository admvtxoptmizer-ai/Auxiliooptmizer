exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { config, package: packageName, version, timestamp } = data;

    if (!config || !packageName || !version) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Dados incompletos',
          message: 'config, package e version são obrigatórios' 
        })
      };
    }

    console.log('Configuração recebida:', { config, packageName, version, timestamp });

    const response = {
      success: true,
      message: 'Configurações aplicadas com sucesso',
      data: {
        config: config,
        package: packageName,
        version: version,
        timestamp: timestamp,
        applied_at: new Date().toISOString()
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Erro ao processar configuração:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor',
        message: error.message 
      })
    };
  }
};
