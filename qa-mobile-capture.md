# Validação — Captura por câmera e formulário móvel

Em 27/08/2026, o formulário **Registrar o dia** foi ajustado para o uso em campo. A seleção de imagem agora declara preferência pela câmera traseira (`capture="environment"`) nos navegadores que oferecem esse recurso, sem impedir a escolha de fotos já existentes.

Os campos de equipe, horas e produção passaram a solicitar teclado numérico ou decimal em dispositivos móveis. Os controles receberam altura maior para toque, a atividade e a ocorrência ganharam áreas de texto mais confortáveis e o botão de salvar passou a ocupar uma área de toque mais clara.

A checagem TypeScript, a suíte completa com 9 arquivos e 20 testes, e o build estático foram concluídos com sucesso. O código-fonte também foi verificado para confirmar a presença dos atributos de captura e entrada numérica.
