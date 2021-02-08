# **dev-panel**

> **dev-panel** will make your every day development a little easier.. Live demo <a href="https://www.sandbox.involvedigital.cz/dev-panel/demo" target="_blank">here</a>! <br />
>Be careful not to use **dev-panel** in production environment!

**dev-panel** is useful tool for web application developers, or testers written in React. <br />
Its main aim is to help with unavoidable repetitive tasks, mainly **logging users in** and **filling forms**.

This tool is brought to you by [Involve Digital s.r.o.](https://www.involve.cz/). <br />
Original idea by **Jan Tölg**, programmed by **Ondřej Tölg**, designed by **Jakub Bárta**.

**dev-panel**, when implemented, is located in top left corner of the page. <br />
There are also available some keyboard shortcuts, that will save you even more clicks!

?> **`shift + x`** ... keyboard combo can be used for expansion / collapse of dev-panel

**dev-panel** consists of few useful sections; each section is in **dev-panel** and has configuration in modal window, that can be accessed by clicking on button in lower part of section:

## Useful links

This section allows you to bind some links, that are not easily accessible within your application (e.g. are not in menu).

#### section
![](/img/useful-links.png)

#### config modal
![](/img/useful-links-modal.png)

<hr>

## Form fillers

This is the main feature of **dev-panel**. It allows you to fill forms at the speed of light! Just kidding, but definitely faster, than typing every single field manually. <br />

You start by setting up values-to-be-used in config modal. This can be done by:
1. Manualy filling name of input and value to be used
2. Prefilling form and then literally picking the inputs and letting dev-panel do the work

When the form filler is saved and ready, new button in the section shows up.

> <p>For random number you can use variable <strong>(rand[min-max])</strong>, which will be replaced with random number from <i>min</i> to <i>max</i>. <br/>e.g: <u>customer(rand[1000-2000])@test.cz</u></p>
  
> For random string you can use variable <strong>(rand[str1,str2,...])</strong>, which will be replaced with random value from given set. <br/>e.g: <u>(rand[John,David,Mark])</u>

For more information check tooltips in config modal in <a href="https://www.sandbox.involvedigital.cz/dev-panel/demo" target="_blank">live demo</a>.

?> **`shift + f`** ... keyboard combo allows you to use form filler, that is marked as **default**

#### section
![](/img/form-fillers.png)

#### config modal
![](/img/form-fillers-modal.gif)

<hr>

## User logins

This section allows you to login to your application without need to do it manually. <br />

**Additional application logic is required for the actual login.**

User account details are passed in url, namely:
- username
- password
- redirect - link to where application should redirect you after successful login
- backlink - if your application uses backlinks and one is present in url, **dev-panel** will pas it to login script as well

> We recommend using only testing accounts as the passwords are not hidden. <br />
> For more information check tooltips in config modal in <a href="https://www.sandbox.involvedigital.cz/dev-panel/demo" target="_blank">live demo</a>.

?>
**`shift + a`** ... keyboard combo will log you in as an **admin** <br />
**`shift + k`** ... keyboard combo will log you in as **customer** <br />
**`shift + o`** ... keyboard combo will log you out

#### section
![](/img/user-logins.png)

#### config modal
![](/img/user-logins-modal.png)

<hr>

## Temp / cache cleaner

Sometimes you need to clean projects temporary files or cache, which usually requires manually deleting several folders. <br />
This section helps you do just that in a matter of microseconds. <br />

**Additional application logic is required for the actual cache cleaning.**

> For more information check tooltips in config modal in <a href="https://www.sandbox.involvedigital.cz/dev-panel/demo" target="_blank">live demo</a>.

?> **`shift + t`** ... keyboard combo will make ajax request for cache cleaning

#### section
![](/img/temp-cache-cleaner.png)

#### config modal
![](/img/temp-cache-cleaner-modal.png)

<hr>

Impressed? Try live demo <a href="https://www.sandbox.involvedigital.cz/dev-panel/demo" target="_blank">here</a>!
