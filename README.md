# Conversor de Vídeo - Google Cloud Storage

Esta biblioteca oferece a capacidade de converter automaticamente todos os vídeos adicionados a um bucket do Google Cloud Storage e salvá-los em outro bucket já convertidos, tornando-se uma solução prática para padronizar o formato e a codificação dos vídeos enviados por usuários de um projeto. 

Além de garantir a compatibilidade na reprodução desses vídeos, essa funcionalidade também ajuda a otimizar os custos de armazenamento, uma vez que os vídeos convertidos geralmente ocupam menos espaço.

O uso dessa solução é especialmente útil para projetos que lidam com grande quantidade de vídeos, pois ajuda a evitar a inconveniência de converter manualmente cada arquivo individualmente. Ademais, essa ferramenta pode ser facilmente integrada a outros serviços do Google Cloud Platform, como o Cloud Functions, possibilitando a criação de fluxos de trabalho automatizados mais complexos. Isso permite automatizar tarefas repetitivas e priorizar atividades mais relevantes para o seu projeto.

## Requisitos

Tenha uma projeto no [Google Cloud Platform](https://console.cloud.google.com/) autorizado a trabalhar com as seguintes APIs:

- Cloud Storage
- Cloud Functions
- Cloud Artifact Registry
- Cloud Pub/Sub
- Cloud Logging

## Configuração no Cloud Functions
1. Faça login no [console do Google Cloud Platform](https://console.cloud.google.com) e selecione o projeto em que quer aplicar a biblioteca.

2. Na página do [Cloud Storage](https://console.cloud.google.com/storage/), clique em **Criar** para criar um bucket.

3. Crie um bucket para receber os vídeos brutos e outro para receber os vídeos convertidos. Por exemplo:

~~~~
videoconverter-input
~~~~
~~~~
videoconverter-output
~~~~

> Para minimizar custos com tráfego e recuperação, crie os dois buckets na mesma região e com a classe Standart.

4. No console do [Cloud Functions](https://console.cloud.google.com/functions/), clique em **Criar Função**.

Dê um nome para a sua função, selecione preferencialmente a mesma região em que estão locados os seus buckets.

Selecione como _Tipo de gatilho_ a opção **Cloud Storage** e como _Event type_ a opção **Ao (finalizar/criar) arquivo no bucket selecionado**. Selecione o _bucket_ que você configurou para ser o **input** da aplicação.

Na seção **Configurações de tempo de execução, build, conexões e segurança**, configure a _memória alocada_ e o _tempo de execução_ conforme os vídeos que você espera receber em sua aplicação. Quanto maior a duração e a resolução dos vídeos, mais tempo e recurso você precisará.

5. Na tela seguinte, selecione **Node.js 18** como _Ambiente de execução_.

6. Copie _index.js_ e _package.json_ para a função e defina **convertVideo** como _Ponto de entrada_.

7. Teste a sua função enviando um vídeo para o bucket de input. Acompanhe a execução através dos logs da função. Quando a conversão terminar, o vídeo convertido deverá estar no bucket de output.

## Bibliotecas externas

* [FFMPEG](https://ffmpeg.org/) - Famosa biblioteca de manipulação de áudio e vídeos.
* [Node-Fluent-FFMPEG](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) - API de manipulação do ffmpeg usando NodeJS.

## Autor

**Itrio Netuno** - 
[GitHub](https://github.com/itrio) -
[LinkedIn](https://www.linkedin.com/in/itrionetuno/)
