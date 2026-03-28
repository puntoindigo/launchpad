graph TD
    subgraph Core_y_Gestion ["Core & Auth"]
        accounts[puntoindigo/accounts] style accounts fill:#f9f,stroke:#333
        id[puntoindigo/id] style id fill:#f9f,stroke:#333
        launchpad[puntoindigo/launchpad]
    end

    subgraph Productos_Verticales ["Productos & Servicios"]
        remitero[puntoindigo/remitero] style remitero fill:#dfd,stroke:#333
        oliveros[puntoindigo/oliveros]
        recibos[puntoindigo/recibos-gremio]
        postulador[puntoindigo/postulador]
    end

    subgraph IA_y_Automatizacion ["AI Stack"]
        ai[puntoindigo/ai] style ai fill:#bbf,stroke:#333
        orchestrator[puntoindigo/devbot-orchestrator]
        vorum[puntoindigo/vorum]
        vorumwa[puntoindigo/vorum-wa]
    end

    subgraph Labs_y_Frontend ["Experimental & UI"]
        audio[puntoindigo/v0-audio-generation-interface]
        mvp[puntoindigo/mvp]
        dev[puntoindigo/dev]
    end

    %% Relaciones sugeridas
    id --> accounts
    accounts --> remitero
    ai --> orchestrator
    orchestrator --> vorum
    vorum --> vorumwa
