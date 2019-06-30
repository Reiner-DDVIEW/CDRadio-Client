This is currently setup so it can run alongside the existing client on a /v2/ path,
for that you need to build this Project with `npm run build`.

Inside the template folder of the Flask app you create a folder v2 that you copy the contents of the build folder into, 
then you only need to add:
```python
@app.route('/v2/')
@app.route('/v2/index.html')
@app.route('/v2/index')
def v2():
    remark = app.config['WIT_REMARKS'][randint(0, len(app.config['WIT_REMARKS'])-1)]
    title = app.config['PAGE_TITLE']
    ext_link = app.config['EXT_LINK']
    stream_source = app.config['STREAM_SOURCE']
    return render_template('/v2/index.html', remark=remark, title=title, ext_link=ext_link, stream_source=stream_source)

@app.route('/v2/<path:path>')
def static_proxy(path):
    return send_from_directory('./templates/v2/', path)
```
to your routes.py file.

It can currently do everything the original one could with the bonus of being responsive and has already the foundation laid to add authorization and the websocket part that is supposed to come in the future.
