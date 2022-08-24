package email

import (
	"bytes"
	"text/template"
)

var VerificationEmailTemplate = `<!DOCTYPE html>
<html>
    <body>
        <p>Hi {{.TeamName}},</p>
		<p>You can verify your Vinci account via the link: <a href='{{.Link}}'>{{.Link}}</a></p>
		<p>Good luck!</p'>
    </body>
</html>`

var RenewPasswordEmailTemplate = `<!DOCTYPE html>
<html>
    <body>
        <p>Hi {{.TeamName}},</p>
		<p>You can renew password of your Vinci account via the link: <a href='{{.Link}}'>{{.Link}}</a></p>
		<p>Best!</p'>
    </body>
</html>`

type TemplateValues struct {
	TeamName string
	Link     string
}

func RenderVerificationEmailTemplate(v TemplateValues) string {
	var t = template.Must(template.New("Verification").Parse(VerificationEmailTemplate))
	var b bytes.Buffer
	t.Execute(&b, v)

	return b.String()
}

func RenderRenewPasswordEmailTemplate(v TemplateValues) string {
	var t = template.Must(template.New("RenewPassword").Parse(RenewPasswordEmailTemplate))
	var b bytes.Buffer
	t.Execute(&b, v)

	return b.String()
}
