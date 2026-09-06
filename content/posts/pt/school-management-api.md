---
title: "Construir uma plataforma escolar a partir de um esboço"
date: "2026-07-08"
description: "A arquitetura de uma API de gestão escolar — uma stack deliberadamente simples, ficheiros que nunca passam pelo servidor e um responsável por cada regra difícil."
tags: ["Arquitetura", "Design de API", "Laravel", "S3"]
---

A plataforma gere os elementos de uma escola: anos letivos, turmas, cursos, disciplinas, anúncios e os documentos que professores, estudantes e funcionários partilham segundo regras reais de acesso. Tornou-se numa API com duzentos commits, mas as decisões que a moldaram foram tomadas antes de existir código.

## Começar com um esboço, não com uma estrutura pronta

A primeira versão foi uma página de notas: uma tabela que ligava turmas a cursos, uma matriz de funções — administrador, professor, colaborador e estudante — e um diagrama de sequência. Depois surgiu um protótipo deliberadamente descartável com apenas três conceitos, construído para descobrir onde o modelo do domínio começaria a ceder.

Cedeu rapidamente, e esse era o objetivo. O sistema de produção manteve as aprendizagens e descartou o código: o domínio final — anos letivos, turmas, cursos, disciplinas e documentos — nasceu da observação das fragilidades do protótipo, não de um documento de requisitos.

> Criar um protótipo para encontrar as ligações. Depois, deixar o protótipo morrer.

Uma noite de esboços e um protótipo descartável custaram quase nada. Uma reescrita após seis meses sobre o modelo errado teria custado muito mais.

## Uma stack deliberadamente simples

Cada escolha tecnológica favoreceu o caminho conhecido:

- **Laravel** como framework — convenções em vez de invenção e uma abordagem madura a testes, utilizada por treze conjuntos de testes funcionais.
- **Autenticação por tokens e um pacote estabelecido de permissões** para a matriz de funções — o controlo de acesso é precisamente o lugar errado para ser original.
- **Redis** para cache, **armazenamento compatível com S3** para ficheiros e **documentação interativa gerada para a API**, tornando o contrato navegável em vez de depender do conhecimento informal da equipa.

A simplicidade é uma vantagem neste caso. O orçamento de novidade do projeto foi gasto onde cria valor: na arquitetura de carregamento e nas regras de visibilidade.

## Ficheiros que nunca passam pelo servidor

A decisão central: a API coordena os carregamentos, mas nunca transporta os bytes dos ficheiros. A entrada acontece em três fases.

![Diagrama de sequência Excalidraw da declaração dos ficheiros, carregamento direto no armazenamento e verificação pela API](/blog/case-studies/school-upload-pt.excalidraw.svg)

*Entrada em três fases: declarar, carregar diretamente e verificar. A API coordena o processo sem transportar os ficheiros.*

As consequências são arquitetónicas. A API não precisa de crescer em função do tamanho ou volume dos ficheiros. A primeira fase é tudo ou nada — se não for possível emitir permissões para todos os ficheiros declarados, nada é registado. A fase final não é tudo ou nada de propósito: um carregamento parcial deixa um registo consultável dos ficheiros que chegaram, em vez de desaparecer sem explicação.

Duas políticas apoiam esta decisão. Os caminhos de armazenamento são tratados como um contrato permanente, porque já existem ficheiros nesses locais. Quando não está configurado nenhum bucket — num portátil ou num executor de integração contínua — o sistema degrada-se de forma controlada, sem exigir credenciais cloud apenas para executar um teste.

## Um responsável por cada regra difícil

A pergunta “quem pode ver este documento?” parece simples, mas não é. A resposta depende da função, autoria, estado de partilha e relação do utilizador com a disciplina — e precisa de ser respondida em dois lugares que podem divergir: ao abrir um documento e ao decidir o que incluir numa lista.

Se as duas respostas forem diferentes, o sistema expõe ou mente: uma lista mostra títulos que o utilizador não consegue abrir ou esconde documentos que deveria poder consultar.

A regra é simples: **cada invariante difícil tem exatamente um responsável.** Toda a matriz de visibilidade vive num serviço; o ciclo de carregamento vive noutro; os controladores HTTP são adaptadores finos que autorizam e delegam. Quando uma lista é intencionalmente mais abrangente do que a verificação de um documento — por exemplo, um professor ver documentos ainda não partilhados da sua própria disciplina — a exceção fica documentada e protegida por testes, para ser reconhecida como decisão e não como erro.

## Escrever a linguagem

O repositório inclui um glossário do domínio com uma frase que agora levo para todos os projetos: *os termos correspondem ao código — quando o código e este ficheiro discordam, um deles contém um erro.* O documento define entrada, partilha e visibilidade em prosa, junto do sistema que implementa esses conceitos.

É o elemento de arquitetura mais barato do projeto e talvez o mais valioso: daqui a seis meses, será a diferença entre ampliar as regras de visibilidade e ter de as descobrir novamente desde o início.
