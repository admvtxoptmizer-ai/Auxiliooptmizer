
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API Node.js está rodando 🚀' });
  });

  // ✅ Endpoint de aplicar configuração (igual ao do Netlify)
  app.post('/api/apply-config', (req, res) => {
    const { config, package: packageName, version, timestamp } = req.body;

      if (!config || !packageName || !version) {
          return res.status(400).json({
                error: 'Dados incompletos',
                      message: 'config, package e version são obrigatórios'
                          });
                            }

                              console.log('Config recebida:', { config, packageName, version, timestamp });

                                res.json({
                                    success: true,
                                        message: 'Configurações aplicadas com sucesso',
                                            data: {
                                                  config,
                                                        package: packageName,
                                                              version,
                                                                    timestamp,
                                                                          applied_at: new Date().toISOString()
                                                                              }
                                                                                });
                                                                                });

                                                                                // Porta padrão
                                                                                const PORT = process.env.PORT || 3000;
                                                                                app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}`));
                                                                                