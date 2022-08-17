# Paperboard

Paperboard is a proof-of-concept for displaying Grafana dashboards on a
[Pimoroni](https://shop.pimoroni.com/) EInk display, usually the [Inky
Impression](https://shop.pimoroni.com/products/inky-impression-5-7).

## Scenarios

These instructions include setting up a full Prometheus, Node Exported, and
Grafana stack on a Raspberry pi.  If you only want to use Paperboard to access
remote Grafana instances, you can skip the backend portion of the setup.

## Requirements

These instructions assume you're using Raspberry PI OS.

If you are accessing dashboards that require login, Paperboard requires chromium
and the graphical user interface to be installed. This is needed so you can log
in to the Grafana instance interactively. Once that is done and the cookies are
set, you won't need access to the graphical interface again. (Unless the cookies
expire).

### 32bit vs 64bit

Grafana does not support 32bit operating systems well, although it will still
work.  You may encounter occasional bugs, especially if you log a lot of data.
We recommend you install the 64bit full version of Raspberry PI OS instead.

## Backend Installation

* [Install Node Exporter](https://linuxhit.com/prometheus-node-exporter-on-raspberry-pi-how-to-install/#4-step-1-download-node-exporter-to-your-pi).
  * You can skip the instructions about creating `/var/lib/node_exporter`, we
    don't need it.
  * These instructions have you create node_exporter.service. Edit that file and
    change the line beginning with ExecStart to:
    `ExecStart=/opt/node_exporter/node_exporter --collector.systemd
    --collector.processes`
  * Use `status` to make sure everything is working: `sudo systemctl status
    node_exporter.service`
* [Install Prometheus](https://pimylifeup.com/raspberry-pi-prometheus/). Note
  that these instructions link to an old version of Prometheus.  Navigate to the
  [Releases](https://github.com/prometheus/prometheus/releases/) page to locate
  the most recent version.
  * Edit the `prometheus.yml` you created with those instructions.
  * At the bottom, add another `job_name` section:
    ```
    - job_name: node
      static_configs:
        - targets: ['localhost:9100']
    ```
    Make sure to match the format of the tabbing of the rest of the file.
  * Restart Prometheus: `sudo systemctl restart prometheus`
  * Use `status` to make sure everything is working: `sudo systemctl status
    prometheus`
* [Install Grafana](https://grafana.com/tutorials/install-grafana-on-raspberry-pi/)

## Frontend Installation

* [Install Inky](https://github.com/pimoroni/inky#installation) E-Ink driver.
* Install needed packages: `sudo apt install chromium-browser npm`
* Launch chromium and navigate to [http://localhost:3000/](http://localhost:3000/).
* Log in and play around with grafana! You might want to load a nice
  [node_exporter dashboard json
  file](https://github.com/rfrail3/grafana-dashboards/blob/master/prometheus/node-exporter-full.json)
* Inside this Paperboard directory, run `npm install` to install dependencies.

## Usage

You can generate screenshots with the screenshot.js file, specifying a URL for
your grafana dashboard (or any website, really). The screenshot is saved in the
current directory as screenshot.png.

`node ./screenshot.js --url "http://localhost:3000/d/BUNCHOFLETTERS/your-dashboard-name" --oversample=1.5`

Then, you can show that image on your eink display:

`./image.py screenshot.png`
