---
title: "DiveTribe: substituir a prancheta num centro de mergulho"
date: "2026-07-10"
description: "Como um pedido pouco definido para digitalizar um processo ramificado em papel se tornou num fluxo de produção para mergulhadores e equipa do centro."
tags: ["Caso de estudo", "Arquitetura", "Next.js", "Laravel"]
---

Uma pessoa que visita a DiveTribe preenche entre dois e quatro formulários, conforme a atividade. Alguns seguem os formatos oficiais da SSI e recolhem informação para avaliar se a pessoa está apta a mergulhar; outros recolhem dados necessários à operação da DiveTribe.

Num dia movimentado, isso transforma-se numa grande pilha de papel — formulários que a equipa precisa de distribuir, rever, organizar e recuperar. A DiveTribe queria uma aplicação web simples onde os participantes pudessem concluir o processo no telemóvel, receber cópias por email e permitir à equipa consultar todas as submissões num só lugar.

O pedido inicial parecia simples: colocar os formulários online. Mas não existia uma especificação detalhada e o cliente ainda não conhecia todas as funcionalidades necessárias. Antes de escrever o sistema, trabalhei com a DiveTribe para compreender o processo existente, identificar limitações como a preservação dos formatos oficiais da SSI e transformar a ideia num fluxo fiável para participantes e equipa.

Este caso de estudo aborda dois desafios ligados: descobrir o produto antes de o construir e fazer evoluir a arquitetura quando a primeira implementação começou a mostrar os seus limites.

## Transformar categorias num fluxo

A análise dos requisitos revelou que não se tratava de um único formulário longo. Era um fluxo ramificado, construído em torno de três tipos de participante. Todos tinham primeiro de preencher o formulário de registo da DiveTribe; a categoria determinava os formulários seguintes.

| Participante | Sequência obrigatória |
| --- | --- |
| Mergulhador certificado | Registo DiveTribe → formulário médico → termo de responsabilidade → Código do Mergulhador Responsável |
| Iniciante numa experiência de mergulho | Registo DiveTribe → formulário Try Dive |
| Participante de snorkeling | Registo DiveTribe → formulário de snorkeling |

A sequência fazia parte das regras de negócio, não era apenas uma preferência visual. A aplicação precisava de orientar cada participante pelo percurso correto, recolher uma assinatura nos formulários relevantes e preservar o formato oficial da SSI quando necessário.

O fluxo da equipa era igualmente importante. A DiveTribe precisava de identificar cada participante, consultar o que tinha sido submetido e descarregar cada formulário concluído no PDF correspondente. O produto tinha, por isso, de ligar uma experiência adaptada ao telemóvel a um registo operacional claro para quem gere o centro de mergulho.

## Um produto, dois sistemas

A DiveTribe está deliberadamente dividida em dois sistemas implementados de forma independente: um frontend em TypeScript, construído com Next.js, Tailwind e uma biblioteca de componentes acessíveis; e um backend em PHP, construído com Laravel, executado em contentores e exposto através de uma API REST versionada.

A fronteira é um contrato, não uma conveniência. O frontend não sabe que formulários existem nem que regras os governam; o backend não tem opinião sobre o aspeto da interface. Esta separação trouxe alguma duplicação de tipos, mas continuou a ser a escolha certa: alterações de conteúdo e design são publicadas em minutos a partir da plataforma do frontend, enquanto a API — a parte que trata dados médicos — avança a um ritmo mais lento e deliberado. Dois perfis de risco, dois ritmos de entrega, um contrato.

## Formulários são dados, não ecrãs

A decisão fundamental: **as definições dos formulários vivem na base de dados, não na interface.** Um formulário é um registo; os seus campos, tipos, ordem e traduções também são registos. O frontend contém apenas um ecrã de formulário — um motor que apresenta o que a API descreve.

Este é o compromisso clássico entre flexibilidade e facilidade de consulta, e a DiveTribe escolheu a flexibilidade de forma consciente:

- **Ganho:** o centro pode adicionar um termo sazonal, reordenar perguntas ou retirar um formulário sem implementar software.
- **Ganho:** quatro idiomas — inglês, alemão, francês e português — partilham as mesmas definições; até os rótulos dos campos são dados traduzidos.
- **Custo:** as consultas de relatórios ficam mais complexas e o painel administrativo absorve essa complexidade para que os utilizadores não a vejam.

A sequência é imposta, não apenas sugerida. O registo é um fluxo ordenado com progresso sempre visível; tentar avançar através do endereço leva simplesmente ao próximo passo incompleto.

## A vida de uma submissão

Toda a plataforma converge num único fluxo com uma função: transformar uma sequência concluída em documentos na caixa de entrada do participante.

![Diagrama Excalidraw de uma submissão ao longo da sequência de formulários, armazenamento na API, verificação, geração de PDFs e entrega segura por email](/blog/case-studies/divetribe-submission-pt.excalidraw.svg)

*O fluxo de submissão: os participantes percorrem a sequência de formulários; a conclusão inicia a geração e entrega dos documentos.*

Duas decisões têm maior peso neste fluxo. Primeiro, os participantes são reconhecidos pelo email entre visitas, evitando registos duplicados e mantendo fiável a área administrativa. Segundo, a verificação de que “tudo está concluído” acontece estritamente *depois* de os dados serem guardados, sem ficar presa ao mesmo processo, porque a entrega e o armazenamento falham de formas diferentes e devem poder falhar separadamente.

Os PDFs são gerados sobre os verdadeiros modelos em papel do centro, incluindo um tipo de letra manuscrito para as assinaturas. Foi uma decisão de design disfarçada de decisão técnica: o resultado precisava de parecer o documento em que o setor do mergulho já confia.

## Privacidade como restrição arquitetónica

Os participantes carregam documentos de identificação. A regra adotada foi absoluta: **a localização de armazenamento nunca é exposta.** Os ficheiros ficam num bucket privado e só podem ser consultados através de um endpoint administrativo autenticado que transmite os bytes. As ligações por email são assinadas e expiram; um email reencaminhado deixa de dar acesso, em vez de se tornar numa fuga de dados.

Isto exige mais mecanismos do que disponibilizar ligações diretas para o armazenamento, mas concentra toda a política de acesso num único lugar aplicável e revogável. Limites de pedidos, registo de acessos e bloqueio de IP funcionam por baixo como camadas discretas de proteção.

## Desenhado para o convés de um barco

O briefing de design era ambiental, não estético. Os formulários são preenchidos sob luz solar intensa, em telemóveis molhados e por pessoas com pressa:

1. Um grupo de perguntas visível de cada vez — sem paredes de campos.
2. Áreas de toque adequadas aos polegares, incluindo o espaço para assinar.
3. Progresso sempre visível, porque o abandono é o inimigo do processo sem papel.
4. Mudança de idioma disponível a meio do fluxo, porque um barco de mergulho é um espaço multilingue.

A lição que a DiveTribe me deixou: as decisões de arquitetura mais fortes foram todas *remoções de acoplamento* — ecrãs separados das definições, armazenamento separado da entrega e políticas separadas das ligações. Tudo o que o produto faz bem nasce de uma dessas separações.
