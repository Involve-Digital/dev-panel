# **Setup**

> Be careful when implementing **dev-panel**, you want use it only in development environment!

**dev-panel** data is being stored in JSON. Basic idea is, that this JSON is stored in project repository and is being loaded and saved by application.

Get example JSON <a href="https://sandbox.involvedigital.cz/dev-panel/devPanel.json" target="_blank" download>here</a>

Below is basic implementation of dev-panel in nette application.

#### HTML (latte)

```html
<!-- element for dev-panel to render to -->
<div id="dev-panel"></div>

<script>
  // load JSON and save it in global variable "window.devPanel.data"
  var loadDevPanelData = function () {
    var request = new XMLHttpRequest();
    // {plink :Utils:Development:obtainDevPanelData} generates link to script that sends back dev-panel data JSON
    request.open('GET', {plink :Utils:Development:obtainDevPanelData}, false);
    request.onload = function () {
      window.devPanel.data = JSON.parse(this.response);
    };
    request.send();
  };

  // define global function "window.devPanel.save" that dev-panel uses to save data
  window.devPanel.save = function () {
    var request = new XMLHttpRequest();
    // {plink :Utils:Development:saveDevPanelData} generates link to script that saves dev-panel data JSON
    // this request must be synchronous (third param - true)
    request.open('POST', {plink :Utils:Development:saveDevPanelData}, true);
    request.send(JSON.stringify(window.devPanel.data));
  };

  loadDevPanelData();
</script>

<!-- include dev-panel css and js -->
<link href="https://www.sandbox.involvedigital.cz/dev-panel/styles.css" rel="stylesheet">
<script src="https://www.sandbox.involvedigital.cz/dev-panel/scripts.js"></script>
```

#### PHP (Presenter)

```php
<?php declare(strict_types=1);

namespace App\UtilsModule\Presenters;

use Nette\Utils\FileSystem;
use Nette\Utils\Json;

class DevelopmentPresenter extends UtilsPresenter
{

    public function startup(): void
    {
        parent::startup();
        $this->stopIfIsNotDevServer();
    }

    //////////////////////////////////////////////////////// Dev panel data

    public function actionObtainDevPanelData(): void
    {
        $this->sendJson(Json::decode(FileSystem::read(__DIR__ . '/devPanel.json')));
    }

    public function actionSaveDevPanelData(): void
    {
        FileSystem::write(__DIR__ . '/devPanel.json', (string)$this->getHttpRequest()->getRawBody());
        $this->terminate();
    }

    //////////////////////////////////////////////////////// Test users

    public function actionSignTestUserIn(string $username, string $password, string $redirect = '/'): void
    {
        $this->getUser()->login($username, $password);

        if ($this->backlink) {
            $this->restoreRequest($this->backlink);
        }

        $this->redirectUrl($redirect);
    }

    public function actionSignOut(): void
    {
        $this->getUser()->logout(true);
        $this->redirectUrl('/');
    }

}
```
