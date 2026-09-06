---
title: "Nhafarma: encontrar a farmácia de serviço em Cabo Verde"
date: "2025-08-20"
description: "As farmácias alternam os turnos noturnos. A Nhafarma ajuda a encontrar a farmácia de serviço sem esperar por um anúncio na rádio ou procurar nas notícias online."
tags: ["Caso de estudo", "TypeScript", "Fastify", "Operações", "Prometheus", "Grafana"]
---

As farmácias em Cabo Verde estão espalhadas pelas cidades. À noite, alternam entre si para assegurar o serviço segundo uma escala. Saber onde existe uma farmácia não significa necessariamente saber se é ela que está de serviço.

As pessoas dependem de anúncios pontuais na rádio e de notícias online para conhecer a escala. Quem perde o anúncio precisa de procurar noutro lugar. Quando alguém precisa de uma farmácia à noite, encontrar a informação torna-se mais uma tarefa.

A Nhafarma oferece uma forma direta de pesquisar a farmácia de serviço por ilha e cidade. A pergunta por trás do projeto é simples: a que farmácia posso ir esta noite?

A aplicação web está disponível em [nhafarma.cv](https://nhafarma.cv).

## Dos anúncios para uma pesquisa direta

A escala já existe. O problema é torná-la acessível quando alguém precisa dela, num formato que permita pesquisar a sua localização.

A Nhafarma transforma a escala mensal em registos estruturados: nomes das farmácias, localizações, contactos e datas de serviço. A pesquisa reúne estes dados para que as pessoas encontrem a farmácia certa sem terem de reconstruir a informação a partir de anúncios.

Este propósito orienta o backend. Importar um documento, interpretar uma data de serviço e manter a aplicação disponível servem o mesmo objetivo: ajudar alguém a encontrar a farmácia certa quando precisa.

## Manter a escala atualizada

A escala chega por email, pelo que a primeira versão do processo poderia ter sido um ecrã de carregamento manual. Isso apenas passaria o trabalho para um administrador, sem o eliminar.

Em vez disso, um worker dedicado verifica a caixa de entrada à procura de uma mensagem recente com o assunto esperado, identifica o PDF da escala e guarda o anexo para processamento. Um parser em Python extrai depois a farmácia, a localização, a data e os contactos para um conjunto de dados normalizado, antes de a base de dados PostgreSQL ser atualizada.

![Diagrama Excalidraw do fluxo mensal, desde o anexo recebido por email até ao parser, PostgreSQL e API Fastify](/blog/case-studies/nhafarma-pipeline-pt.excalidraw.svg)

*O fluxo mensal transforma um documento feito para leitura em registos preparados para pesquisa.*

O worker é executado separadamente da API. Uma caixa de correio lenta ou um PDF mal formatado não compete com os pedidos dos utilizadores, e uma importação falhada pode ser repetida sem reiniciar o serviço utilizado pelo público. A tarefa agendada também impede sobreposições, evitando que duas importações tentem substituir o mesmo mês em simultâneo.

Existe ainda um comando manual para executar a importação mensal. A automação deve retirar o trabalho rotineiro sem retirar ao operador uma forma de intervir quando uma entrega externa se atrasa.

## O tempo faz parte do domínio

A expressão “de serviço hoje” esconde uma regra importante: o período de serviço muda às 08:00 em Cabo Verde, não à meia-noite nem segundo o relógio local do servidor. Antes dessa mudança, quem consulta deve continuar a ver a farmácia do turno anterior.

A Nhafarma coloca esta regra por trás de uma única abstração de relógio. Todas as consultas calculam a data de referência no fuso horário `Atlantic/Cape_Verde`, e os testes podem substituir o relógio real por uma hora fixa. Isso torna explícitos os casos difíceis: imediatamente antes e depois das 08:00, o fim do mês e um servidor instalado noutro fuso horário.

Centralizar o relógio evita divergências subtis. O endpoint da farmácia de hoje e o endpoint do resto do mês não podem inventar, cada um, o seu próprio significado de “agora”.

## Preservar os dados ao mudar a tecnologia

O backend passou de Express e Prisma para Fastify e Drizzle. O objetivo não era reescrever por reescrever, mas simplificar o runtime e a camada de dados sem alterar o contrato em produção.

O esquema Drizzle reproduz deliberadamente as tabelas, colunas, chaves estrangeiras e índices únicos já existentes em PostgreSQL. Os identificadores existentes continuam válidos e os novos registos usam identificadores gerados pela aplicação. A migração de base descreve o que já está em produção, em vez de fingir que a base de dados começa vazia.

Esta restrição mudou a natureza da migração. Ter sucesso significava permitir ao novo código ler os dados antigos e preservar as suas relações, não apenas compilar com uma base de dados de desenvolvimento vazia.

## Tornar observável um sistema discreto

Os dados da escala mudam mensalmente, por isso um fluxo avariado pode permanecer invisível durante semanas. A Nhafarma expõe métricas Prometheus para o volume e duração dos pedidos, estado e duração das consultas à base de dados e pesquisas de farmácias. O endpoint de métricas tem proteção própria, separada da verificação pública de saúde e da documentação da API.

![Dashboard Grafana da Nhafarma com disponibilidade da API, tráfego, percentis de tempo de resposta, códigos de estado, rotas e pesquisas de farmácias](/blog/nhafarma/grafana-dashboard.png)

*O dashboard de produção reúne disponibilidade, latência, tráfego, erros e pesquisas reais de farmácias num único lugar.*

Neste registo, a API está operacional, o tempo de resposta p95 é de 95 milissegundos e o serviço contabilizou nove pesquisas de farmácias. O painel de rotas também revela o ruído de fundo de um serviço público: pedidos automáticos à procura de nomes comuns de ficheiros `.env`. Esses pedidos aparecem como respostas HTTP 401, tornando o dashboard numa confirmação de que a proteção está a funcionar — não apenas numa visualização do tráfego.

Os logs estruturados registam cada resposta com rota, estado, duração e data. Limites de pedidos protegem as rotas autenticadas da API, enquanto os endpoints de saúde e documentação continuam disponíveis para operações. O Docker executa a API e o worker mensal como serviços separados na mesma rede de implementação.

Estas funcionalidades respondem a perguntas práticas:

- A API está a responder ou apenas o contentor está em execução?
- O worker mensal terminou?
- As pesquisas falham numa localização ou em todo o lado?
- A latência da base de dados mudou após uma implementação?
- Algum cliente está a fazer mais pedidos do que o esperado?

A Nhafarma nasceu de uma distância entre uma escala publicada e as pessoas que precisam dela. A rádio e as notícias online divulgam a informação; uma ferramenta de pesquisa torna-a mais fácil de encontrar novamente quando surge a necessidade.

O trabalho de backend serve esse propósito. Para alguém que procura uma farmácia à noite, o resultado útil é um nome, uma localização e a escala certa.
